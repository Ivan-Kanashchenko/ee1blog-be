import jwt from "jsonwebtoken";

export const createToken = (id: string) =>
  jwt.sign(
    {
      _id: id,
    },
    "secretKey",
    { expiresIn: "30d" }
  );
