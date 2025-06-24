import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegistrationUserDto } from './dto/registration.dto';
import { PrismaClient, UserAlias, UserAliasType } from '@prisma/client';

import * as bcrypt from 'bcryptjs';
import {
  LoginResponseDto,
  LoginUserDto,
  RefreshTokenDto,
} from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from 'src/config/redis/redis.service';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/config/bull/bull.interface';
import { Queue } from 'bull';
import { ConfirmPasswordDto } from './dto/confirm-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import Hashids from 'hashids';
import {
  MailConfirmationCodeDto,
  MailConfirmationDto,
} from './dto/mail-confrim.dto';
import { TelegramLoginDto } from './dto/telegram-login.dto';
import * as crypto from 'crypto';
import { IpApiService } from 'src/config/ip-api/ip-api.service';

@Injectable()
export class AuthService {
  private hashids: Hashids;

  constructor(
    private readonly configService: ConfigService,
    protected readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
    private redisService: RedisService,
    @InjectQueue(QUEUE_NAME.smtp)
    private smtpQueue: Queue,
    private ipApiService: IpApiService,
  ) {
    this.hashids = new Hashids(
      this.configService.get<string>('HASHIDS_SALT'),
      10,
    );
  }

  async registration(
    registrationUserDto: RegistrationUserDto,
  ): Promise<StatusOKDto> {
    const { email, password, referral_code } = registrationUserDto;

    await this.prisma.$transaction(async (tx) => {
      const userAlias = await tx.userAlias.findFirst({
        where: {
          alias_type: UserAliasType.EMAIL,
          value: email,
        },
      });

      if (userAlias) {
        throw new BadRequestException('email_already_exists');
      }

      let referredBy: number | null = null;

      if (referral_code) {
        const referrer = await tx.user.findFirst({
          where: { referral_code: referral_code },
        });

        if (!referrer) {
          throw new BadRequestException('invalid_referral_code');
        }
        referredBy = referrer.user_id;
      }

      const existsUsername = await tx.user.count({
        where: {
          username: registrationUserDto.username
        }
      });

      if (existsUsername > 0) {
        throw new BadRequestException('username_exists');
      }

      const user = await tx.user.create({
        data: {
          email: registrationUserDto.email,
          username: registrationUserDto.username,
        },
      });

      const generatedReferralCode = this.hashids.encode(user.user_id);
      await tx.user.update({
        where: { user_id: user.user_id },
        data: { referral_code: generatedReferralCode },
      });

      if (registrationUserDto.utm) {
        await tx.utmMarker.create({
          data: {
            user_id: user.user_id,
            ...registrationUserDto.utm,
          },
        });
      }

      await tx.userAlias.create({
        data: {
          user_id: user.user_id,
          value: email,
          proof: await bcrypt.hash(password, 12),
        },
      });

      if (referredBy) {
        await tx.referral.create({
          data: {
            user_id: user.user_id,
            referred_by: referredBy,
            created_at: new Date(),
          },
        });
      }
    });

    await this.smtpQueue.add('registrationMessage', {
      email,
    });
    return new StatusOKDto();
  }

  async login(
    loginUserDto: LoginUserDto,
    ip: string,
  ): Promise<LoginResponseDto> {
    const validateUser = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    const payload = { email: validateUser?.value, sub: validateUser?.user_id };
    await this.checkIp(ip, validateUser?.user_id as number);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
    ip: string,
  ): Promise<LoginResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshTokenDto.refresh_token, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });
      const jwtPayload = { email: payload.email, sub: payload.sub };
      await this.checkIp(ip, payload.sub as number);
      const newAccessToken = this.jwtService.sign(jwtPayload);
      const newRefreshToken = this.jwtService.sign(jwtPayload, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      });
      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (err) {
      throw new UnauthorizedException('invalid_refresh_token');
    }
  }

  async mailConfirmationCode(
    mailConfirmationCodeDto: MailConfirmationCodeDto,
  ): Promise<StatusOKDto> {
    const userEmail = await this.redisService.get(
      `mail-confirmation:${mailConfirmationCodeDto.code}`,
    );
    if (userEmail !== mailConfirmationCodeDto.email) {
      throw new BadRequestException('invalid_or_expired_code');
    }
    const user = await this.prisma.user.findFirst({
      where: { email: userEmail },
    });
    if (!user) {
      throw new BadRequestException('invalid_or_expired_code');
    }
    if (user.mail_confirmed) {
      throw new BadRequestException('mail_already_confirmed');
    }

    await this.prisma.user.update({
      where: { user_id: user.user_id },
      data: { mail_confirmed: true },
    });
    await this.redisService.del(
      `mail-confirmation:${mailConfirmationCodeDto.code}`,
    );
    return new StatusOKDto();
  }

  async mailConfirmation(
    mailConfirmationDto: MailConfirmationDto,
  ): Promise<StatusOKDto> {
    const user = await this.prisma.user.findFirst({
      where: { email: mailConfirmationDto.email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.mail_confirmed) {
      throw new BadRequestException('User mail already confirmed');
    }
    const code = Math.floor(100000 + Math.random() * 999999);
    await this.smtpQueue.add('mailConfirmationMessage', {
      email: mailConfirmationDto.email,
      code: code,
    });
    const expirationTime = 3600;

    await this.redisService.setex(
      `mail-confirmation:${code}`,
      expirationTime,
      mailConfirmationDto.email,
    );
    return new StatusOKDto();
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<StatusOKDto> {
    const user = await this.prisma.userAlias.findFirst({
      where: { value: resetPasswordDto.email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const token = uuidv4();
    const expirationTime = 3600;

    await this.redisService.setex(
      `password-reset:${token}`,
      expirationTime,
      user.value.toString(),
    );
    await this.smtpQueue.add('resetPasswordMessage', {
      email: resetPasswordDto.email,
      link: `${this.configService.get('FRONTEND_URL')}?code=${token}`,
    });
    return new StatusOKDto();
  }

  async confirmPassword(
    confirmPasswordDto: ConfirmPasswordDto,
  ): Promise<StatusOKDto> {
    const userValue = await this.redisService.get(
      `password-reset:${confirmPasswordDto.code}`,
    );

    if (!userValue) {
      throw new BadRequestException('Invalid or expired token');
    }

    const user = await this.prisma.userAlias.findFirst({
      where: { value: userValue },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const hashedPassword = await bcrypt.hash(confirmPasswordDto.password, 12);

    await this.prisma.userAlias.update({
      where: { user_alias_id: user.user_alias_id },
      data: { proof: hashedPassword },
    });

    await this.redisService.del(`password-reset:${confirmPasswordDto.code}`);
    return new StatusOKDto();
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    userId: number,
  ): Promise<StatusOKDto> {
    const user = await this.prisma.userAlias.findFirst({
      where: { user_id: userId },
    });
    const oldPasswordCorrect = await bcrypt.compare(
      changePasswordDto.old_password,
      user!.proof,
    );
    if (oldPasswordCorrect) {
      const hashedPassword = await bcrypt.hash(
        changePasswordDto.new_password,
        12,
      );
      await this.prisma.userAlias.update({
        where: { user_alias_id: user!.user_alias_id },
        data: { proof: hashedPassword },
      });
      return new StatusOKDto();
    }
    throw new BadRequestException('No valid old password');
  }

  private async validateUser(
    value: string,
    password: string,
  ): Promise<Partial<UserAlias> | null> {
    const user = await this.prisma.userAlias.findFirst({
      where: { alias_type: UserAliasType.EMAIL, value: value },
    });
    if (user && (await bcrypt.compare(password, user.proof))) {
      return { user_id: user.user_id, value: user.value };
    }
    throw new UnauthorizedException('invalid_login_or_password');
  }

  async telegramLogin(
    telegramLoginDto: TelegramLoginDto,
    ip: string,
  ): Promise<LoginResponseDto> {
    if (!telegramLoginDto.hash || !telegramLoginDto.id) {
      throw new UnauthorizedException('Invalid Telegram data');
    }

    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!botToken) {
      throw new BadRequestException('Telegram bot token not configured');
    }

    const dataCheckString = Object.entries(telegramLoginDto)
      .filter(([key]) => key !== 'hash')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secretKey = crypto.createHash('sha256').update(botToken).digest();
    const hash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (hash !== telegramLoginDto.hash) {
      throw new BadRequestException('Invalid hash');
    }

    let user = await this.prisma.userAlias.findFirst({
      where: {
        alias_type: UserAliasType.TELEGRAM,
        value: telegramLoginDto.id,
      },
      include: {
        user: true,
      },
    });

    if (!user) {
      const newUser = await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            avatar_url: telegramLoginDto.photo_url,
            username: telegramLoginDto.username,
            first_name: telegramLoginDto.first_name,
            last_name: telegramLoginDto.last_name,
          },
        });
        const generatedReferralCode = this.hashids.encode(user.user_id);
        await tx.user.update({
          where: { user_id: user.user_id },
          data: { referral_code: generatedReferralCode },
        });

        await tx.userAlias.create({
          data: {
            user_id: user.user_id,
            value: telegramLoginDto.id,
            alias_type: UserAliasType.TELEGRAM,
            proof: '',
          },
        });

        return user;
      });

      user = await this.prisma.userAlias.findFirst({
        where: {
          user_id: newUser.user_id,
        },
        include: {
          user: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Failed to create user');
      }
    }
    await this.checkIp(ip, user.user_id);

    const payload = { email: user.value, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    };
  }

  async bindAuthData(
    bindAuthDataDto: LoginUserDto,
    userId: number,
  ): Promise<StatusOKDto> {
    const { email, password } = bindAuthDataDto;

    const existingEmail = await this.prisma.userAlias.findFirst({
      where: {
        alias_type: UserAliasType.EMAIL,
        value: email,
      },
    });

    if (existingEmail) {
      throw new BadRequestException('Email already in use');
    }

    const existingUserEmail = await this.prisma.userAlias.findFirst({
      where: {
        user_id: userId,
        alias_type: UserAliasType.EMAIL,
      },
    });

    if (existingUserEmail) {
      throw new BadRequestException('User already has email bound');
    }

    await this.prisma.userAlias.create({
      data: {
        user_id: userId,
        value: email,
        alias_type: UserAliasType.EMAIL,
        proof: await bcrypt.hash(password, 12),
      },
    });

    return new StatusOKDto();
  }

  async checkIp(userIp: string, userId: number): Promise<StatusOKDto> {
    const ipDetail = await this.prisma.ipDetail.findFirst({
      where: { ip_address: userIp },
    });

    if (!ipDetail) {
      const ipInfo = await this.ipApiService.getIpDetails(userIp);
      if (!ipInfo) {
        throw new BadRequestException('Invalid IP address');
      }
      await this.prisma.ipDetail.create({
        data: {
          ip_address: userIp,
          city: ipInfo?.city || '',
          countryCode: ipInfo?.countryCode || '',
          hosting: ipInfo?.hosting || false,
          isp: ipInfo?.isp || '',
          lat: ipInfo?.lat || 0.0,
          lon: ipInfo?.lon || 0.0,
          mobile: ipInfo?.mobile || false,
          proxy: ipInfo?.proxy || false,
          regionName: ipInfo?.regionName || '',
          status: ipInfo?.status || '',
          zip: ipInfo?.zip || '',
        },
      });
    }

    await this.prisma.user.update({
      where: { user_id: userId },
      data: { ip_address: userIp },
    });

    return new StatusOKDto();
  }
}
