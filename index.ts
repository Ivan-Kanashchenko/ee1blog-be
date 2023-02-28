import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidator } from "./validators/auth";

mongoose
  .connect(
    "mongodb+srv://ee1Solncev:Sinetko225348@testcluster.fewa1fo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected"))
  .catch((e) => console.log("DB Error", e));

const app = express();

app.use(express.json());

const getToken = (mail: string) =>
  jwt.sign(
    {
      mail: mail,
    },
    "secretKey"
  );

interface RequestBody<T> extends Request {
  body: T;
}

interface ILogin {
  mail: string;
  password: string;
}
interface IRegister extends ILogin {
  mail: string;
  password: string;
  fullName: string;
}

app.post("/auth/login", (req: RequestBody<ILogin>, res: Response) => {
  const token = getToken(req.body.mail);

  res.json({
    success: true,
    token,
  });
});

app.post(
  "/auth/register",
  registerValidator,
  (req: RequestBody<IRegister>, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const token = getToken(req.body.mail);

    res.json({
      success: true,
      token,
    });
  }
);

app.listen(7777, () => console.log("Server Started"));
