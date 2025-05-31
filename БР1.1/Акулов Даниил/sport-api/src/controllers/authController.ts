import {User} from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {dataSource} from "../config/dataSource";
import {SETTINGS} from "../config/settings";
import {Body, Get, JsonController, Post, Req, Res} from "routing-controllers";
import {OpenAPI, ResponseSchema} from "routing-controllers-openapi";
import {Request, Response, NextFunction} from 'express';
import {LoginDto, RegistrationDto} from "../dto/userDto";

const userRepo = dataSource.getRepository(User);

const generateAccessToken = (id: number, email: string) => {
    const payload = { id, email }
    return jwt.sign(payload, SETTINGS.JWT_SECRET_KEY, {expiresIn: "30d"} )
}

@JsonController('/auth')
export class AuthController {
    @OpenAPI({})
    @Post('/registration')
    async registration(
        @Body() body: RegistrationDto,
        @Res() res: Response,
    ) {
        const {email, password, name} = body
        const candidate = await userRepo.findOne({where: {email}})
        if (candidate) {
            throw ApiError.badRequest(errorMessages.emailIsTaken)
        }
        const hashPassword = await bcrypt.hash(password, 6)
        const userEntity = userRepo.create({email, password: hashPassword, name});
        const user = await userRepo.save(userEntity);
        const token = generateAccessToken(user.id, email)
        return res.json({token, user})
    }

    @OpenAPI({})
    @Post('/login')
    async login(
        @Body() body: LoginDto,
        @Res() res: Response,
    ) {
        const {email, password} = body
        const user = await userRepo.findOne({where: {email}})
        if (!user) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            throw ApiError.badRequest(errorMessages.wrongPassword)
        }
        const token = generateAccessToken(user.id, user.email)
        return res.json({token, user})
    }

    @OpenAPI({})
    @Get('/check')
    async check(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        if(!req.user) throw ApiError.forbidden()
        const token = generateAccessToken(req.user.id, req.user.email)
        return res.json({token})
    }
}
