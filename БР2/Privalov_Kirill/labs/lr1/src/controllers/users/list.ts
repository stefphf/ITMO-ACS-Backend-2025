import { Request, Response, NextFunction } from "express";
import { User } from "../../orm/entities/users/User";
import PostgresDataSource from "../../orm/db";
import { CustomError } from "../../utils/customError/CustomError";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = PostgresDataSource.getRepository(User);
  try {
    const users = await userRepository.find();
    res.customSuccess(200, "Users retrieved successfully.", users);
  } catch (err) {
    const customError = new CustomError(
      400,
      "Raw",
      "Error retrieving users.",
      null,
      err
    );
    return next(customError);
  }
};
