import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import SETTINGS from '../config/settings';
import dataSource from '../config/data-source';
import { User } from '../models/User';

/**
 * Service responsible for user authentication: registration and login
 */
export class AuthService {
    private readonly userRepo: Repository<User>;

    constructor() {
        this.userRepo = dataSource.getRepository(User);
    }

    /**
     * Register a new user
     */
    public async register(
        email: string,
        username: string,
        name: string,
        password: string
    ): Promise<User> {
        const existing = await this.userRepo.findOne({
            where: [{ email }, { username }],
        });
        if (existing) {
            throw new Error('Email or username already in use');
        }
        const hash = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({
            email,
            username,
            name,
            passwordHash: hash,
        });
        return this.userRepo.save(user);
    }

    /**
     * Validate credentials and issue a JWT
     */
    public async login(
        email: string,
        password: string
    ): Promise<{ accessToken: string; tokenType: string; expiresIn: number }> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            SETTINGS.JWT_SECRET_KEY,
            { expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME }
        );
        return {
            accessToken: token,
            tokenType: SETTINGS.JWT_TOKEN_TYPE,
            expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
        };
    }
}
