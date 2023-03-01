import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { validationResult } from "express-validator";

import { registerValidator } from "./validators/auth";
import UserModel from "./models/user";

mongoose
  .connect("mongodb+srv://ee1Solncev:Sinetko225348@testcluster.fewa1fo.mongodb.net/blog?retryWrites=true&w=majority")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log("DB Error", e));

const app = express();

app.use(express.json());

const createToken = (id: string) =>
  jwt.sign(
    {
      _id: id,
    },
    "secretKey",
    { expiresIn: "30d" }
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

app.post("/auth/login", async (req: RequestBody<ILogin>, res: Response) => {
  try {
    const user = await UserModel.findOne({ mail: req.body.mail });

    if (!user) return res.status(404).json({ message: "user with this credentials not found" });

    const isValidPass = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPass) return res.status(404).json({ message: "user with this credentials not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.post("/auth/register", registerValidator, async (req: RequestBody<IRegister>, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const user = await new UserModel({
      fullName: req.body.fullName,
      mail: req.body.mail,
      password: await bcrypt.hash(req.body.password, 10),
    }).save();

    const token = createToken(user._id.toString());

    const { fullName, mail, _id } = user;

    res.json({
      success: true,
      _id,
      fullName,
      mail,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.listen(7777, () => console.log("Server Started"));
