import { body } from "express-validator";

export const registerValidator = [
  body("mail", "Wrong email format").isEmail(),
  body("password", "Password must contain 8-16 symbols").isLength({
    min: 8,
    max: 16,
  }),
  body("fullName", "Name must contain 2-20 symbols").isLength({
    min: 2,
    max: 20,
  }),
  body("avatar", "Wrong url").optional().isURL(),
];
