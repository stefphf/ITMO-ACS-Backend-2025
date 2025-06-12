import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import SETTINGS from '../config/settings';

interface JwtPayloadWithUser extends JwtPayload {
    user: any;
}

interface RequestWithUser extends Request {
    user: any;
}

const authMiddleware = (
    request: RequestWithUser,
    response: Response,
    next: NextFunction,
) => {
    const { headers } = request;
    const { authorization } = headers;

    if (!authorization) {
        return response
            .status(401)
            .send({ message: 'Не авторизован: токен не предоставлен' });
    }

    try {
        const [, accessToken] = authorization.split(' ');

        if (!accessToken) {
            return response
                .status(401)
                .send({ message: 'Не авторизован: токен не предоставлен' });
        }

        const { user }: JwtPayloadWithUser = jwt.verify(
            accessToken,
            SETTINGS.JWT_SECRET_KEY,
        ) as JwtPayloadWithUser;

        request.user = user;

        next();
    } catch (error) {
        console.error(error);

        return response.status(403).send({
            message: 'Доступ запрещен: токен недействителен или истек',
        });
    }
};

export { JwtPayloadWithUser, RequestWithUser };

export default authMiddleware;
