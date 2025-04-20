import { Request, Response, NextFunction } from "express";
import { User } from "../../orm/entities/users/User";
import PostgresDataSource from "../../orm/db";
import { CustomError } from "../../utils/customError/CustomError";

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const userRepository = PostgresDataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      const customError = new CustomError(
        404,
        "General",
        `User with id:${id} not found.`,
        ["User not found."]
      );
      return next(customError);
    }
    res.customSuccess(200, "User retrieved successfully.", user);
  } catch (err) {
    const customError = new CustomError(
      400,
      "Raw",
      "Error retrieving user.",
      null,
      err
    );
    return next(customError);
  }
};
