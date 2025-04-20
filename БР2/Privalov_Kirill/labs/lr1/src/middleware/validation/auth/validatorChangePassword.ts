import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validatorChangePassword = [
  check("oldPassword")
    .exists({ checkFalsy: true })
    .withMessage("Current password is required")
    .isLength({ min: 6 })
    .withMessage("Current password must be at least 6 characters long"),
  check("newPassword")
    .exists({ checkFalsy: true })
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),
  check("confirmNewPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please confirm the new password")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("New passwords do not match"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
