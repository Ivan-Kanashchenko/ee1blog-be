import { body } from "express-validator";

export const postCreateValidator = [
  body("title", "title must contain at least 3 symbols").isLength({ min: 3 }).isString(),
  body("text", "text must contain at least 10 symbols")
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags").optional().isString(),
  body("imageUrl", "Wrong url").optional().isURL(),
];
