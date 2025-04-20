import { Request, Response, NextFunction } from "express";
import PostgresDataSource from "../../orm/db";
import { User } from "../../orm/entities/users/User";
import { CustomError } from "../../utils/customError/CustomError";
import { JwtPayload } from "../../types/jwtPayload";
import { Role } from "../../orm/entities/users/types";
import { createJwtToken } from "../../utils/createJwtToken";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const userRepository = PostgresDataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      const customError = new CustomError(404, "General", "Not Found", [
        "Incorrect email or password"
      ]);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(404, "General", "Not Found", [
        "Incorrect email or password"
      ]);
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as Role,
      created_at: user.created_at
    };

    try {
      const token = createJwtToken(jwtPayload);
      res.customSuccess(200, "Token successfully created.", `Bearer ${token}`);
    } catch (err) {
      const customError = new CustomError(
        400,
        "Raw",
        "Token can't be created",
        null,
        err
      );
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
