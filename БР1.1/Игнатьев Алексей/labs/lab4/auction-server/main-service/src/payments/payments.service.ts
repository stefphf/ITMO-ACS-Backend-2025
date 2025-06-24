import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaymentMethod, PaymentStatus, PrismaClient } from '@prisma/client';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { AvrMoneyService } from 'src/config/avrMoney/avrMoney.service';
import {
  TransactionEntity,
  TransactionResponseEntity,
} from './entities/transaction.entity';
import { ConfigService } from '@nestjs/config';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PaginateParams } from 'src/common/params/pagination.params.dto';

@Injectable()
export class PaymentsService {
  invoiceUrl: string;

  logger: Logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaClient,
    private readonly avrMoneyService: AvrMoneyService,
    private readonly notificationService: NotificationsService,
    private configService: ConfigService,
  ) {
    this.invoiceUrl = this.configService.get<string>('AVRMONEY_INVOICE_URL')!;
  }

  async createInvoice(
    createInvoiceDto: CreateInvoiceDto,
    userId: number,
  ): Promise<TransactionEntity> {
    return this.prisma.$transaction(async (tx) => {
      if (
        createInvoiceDto.is_bonus_applied &&
        createInvoiceDto.is_promo_applied
      ) {
        throw new BadRequestException(
          'Cannot use both bonus and promo code simultaneously',
        );
      }

      const existingTransactions = await tx.transaction.findMany({
        where: {
          user_id: userId,
          OR: [
            { status: PaymentStatus.COMPLETED },
            { status: PaymentStatus.CREATED },
          ],
        },
      });

      const isFirstDeposit = existingTransactions.length === 0;
      let totalBonusPercent = 0;

      const user = await tx.user.findFirst({
        where: { user_id: userId },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (createInvoiceDto.is_bonus_applied) {
        if (isFirstDeposit) {
          const settings = await tx.settings.findFirst();
          if (!settings) {
            throw new BadRequestException('Settings not found');
          }
          totalBonusPercent = settings.first_deposit_bonus;
        } else {
          const bonus = await tx.bonus.findFirst({
            where: {
              amount: {
                lte: createInvoiceDto.amount,
              },
            },
            orderBy: {
              amount: 'desc',
            },
          });

          if (bonus) {
            totalBonusPercent += bonus.percent;
          }
        }
      }

      if (createInvoiceDto.is_promo_applied && createInvoiceDto.promocode) {
        const promoCode = await tx.promocode.findFirst({
          where: {
            code: createInvoiceDto.promocode,
            current_count: { lt: tx.promocode.fields.activation_count },
          },
        });

        if (!promoCode) {
          throw new BadRequestException('Invalid or expired promo code');
        }

        await tx.promocode.update({
          where: { promocode_id: promoCode?.promocode_id },
          data: { current_count: { increment: 1 } },
        });

        totalBonusPercent += promoCode.replinish_bonus;
      }

      const bonusAmount = (createInvoiceDto.amount * totalBonusPercent) / 100;
      const totalRatoAmount = createInvoiceDto.amount + bonusAmount;

      const invoice = await this.avrMoneyService.createInvoice(
        createInvoiceDto.amount,
        createInvoiceDto.redirect_url,
      );

      if (!invoice) {
        throw new BadRequestException('Invoice not created');
      }

      this.logger.debug('Created invoice', invoice);

      const transaction = await tx.transaction.create({
        data: {
          amount: createInvoiceDto.amount,
          bonus_amount: bonusAmount,
          payment_id: invoice.id,
          user_id: userId,
          exchange_rate: 1,
          rato_amount: totalRatoAmount,
          method: PaymentMethod.CARD,
          status: PaymentStatus.CREATED,
          expired_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      return {
        ...transaction,
        url: `${this.invoiceUrl}/${invoice.id}`,
      };
    });
  }

  async createInvoiceCallback(
    paymentId: string,
    state?: number,
  ): Promise<StatusOKDto> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { payment_id: paymentId },
    });
    if (transaction) {
      await this.prisma.$transaction(async (tx) => {
        if (state === 5 || state === 6) {
          await tx.transaction.update({
            where: { transaction_id: transaction.transaction_id },
            data: { status: PaymentStatus.CANCELLED },
          });
          return new StatusOKDto();
        }

        await tx.transaction.update({
          where: { transaction_id: transaction.transaction_id },
          data: { status: PaymentStatus.COMPLETED },
        });
        await tx.user.update({
          where: { user_id: transaction.user_id },
          data: {
            rato_balance: { increment: transaction.amount },
            bonus_balance: { increment: transaction.bonus_amount },
          },
        });
        const user = await tx.user.findFirst({
          where: { user_id: transaction.user_id },
          include: { invited_by: true },
        });
        if (!user) {
          throw new BadRequestException('User not found');
        }
        if (user.invited_by) {
          const bonusAmount = transaction.amount * 0.1;
          await tx.user.update({
            where: { user_id: user.invited_by.referred_by },
            data: { rato_balance: { increment: bonusAmount } },
          });

          await this.notificationService.create(
            {
              type: 'REFERRAL_BALANCE_UPDATE',
              message: `You received ${bonusAmount} RATO from your referral's top-up!`,
            },
            user.invited_by.referred_by,
          );

          await this.notificationService.create(
            {
              type: 'BALANCE_UPDATE',
              message: `Your balance replenished by ${transaction.amount} RATO and ${transaction.bonus_amount} bonus RATO`,
            },
            transaction.user_id,
          );
        }
      });
      return new StatusOKDto();
    }
    throw new BadRequestException('Transaction not found');
  }

  async findAll(
    userId: number,
    params: PaginateParams,
  ): Promise<TransactionResponseEntity> {
    const { skip, take } = params;
    const transactions = await this.prisma.transaction.findMany({
      where: { user_id: userId },
      orderBy: {
        created_at: 'desc',
      },
      ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
    });
    return {
      transactions,
      total_items: transactions.length,
    };
  }
}
