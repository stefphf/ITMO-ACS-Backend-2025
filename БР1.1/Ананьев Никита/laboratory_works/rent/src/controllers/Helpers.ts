import axios from "axios";
import { NotFoundError as HttpNotFound, InternalServerError } from 'routing-controllers';

export enum HttpCodes {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    VALIDATION_ERROR = 422,
    INTERNAL_SERVER_ERROR = 500,
}

export const UserServiceUrl = process.env.USER_SERVICE_URL ?? 'http://localhost:8001';

export async function CheckUserExistance(id: number): Promise<void> {
    try {
        await axios.get(`${UserServiceUrl}/users/${id}`);
    } catch(e: any)  {
        if (e.response && e.response.status == 404)
            throw new HttpNotFound(`No user with id=${id} found`);
        throw new InternalServerError("User search failed")
    }
}
