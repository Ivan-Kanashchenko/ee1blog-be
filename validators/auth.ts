import { body } from "express-validator";

export const registerValidator = [
  body("mail").isEmail(),
  body("password").isLength({ min: 8, max: 16 }),
  body("fullName").isLength({ min: 2 }),
  body("avatar").optional().isURL(),
];
