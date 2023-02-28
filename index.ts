import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://ee1Solncev:Sinetko225348@testcluster.fewa1fo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected"))
  .catch((e) => console.log("DB Error", e));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

interface RequestBody<T> extends Request {
  body: T;
}

app.post(
  "/auth/login",
  (req: RequestBody<{ mail: string; password: string }>, res: Response) => {
    console.log(req.body);
    const token = jwt.sign(
      {
        mail: req.body.mail,
      },
      "secretKey"
    );
    res.json({
      success: true,
      token,
    });
  }
);

app.listen(7777, () => console.log("Server Started"));
