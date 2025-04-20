import { JwtPayload } from "./../types/jwtPayload";
import * as jwt from "jsonwebtoken";

export const createJwtToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const expiresIn = Number(process.env.JWT_EXPIRATION);
  if (isNaN(expiresIn)) {
    throw new Error("JWT_EXPIRATION is not a valid number");
  }
  return jwt.sign(payload, secret, { expiresIn });
};
