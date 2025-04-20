import { Request, Response, NextFunction } from "express";
import { User } from "../../orm/entities/users/User";
import { CustomError } from "../../utils/customError/CustomError";
import PostgresDataSource from "../../orm/db";

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, passwordNew } = req.body;
  const { id, name } = req.jwtPayload;

  const userRepository = PostgresDataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, "General", "Not Found", [
        `User ${name} not found.`
      ]);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(400, "General", "Not Found", [
        "Incorrect password"
      ]);
      return next(customError);
    }

    user.password = passwordNew;
    user.hashPassword();
    userRepository.save(user);

    res.customSuccess(200, "Password successfully changed.");
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
