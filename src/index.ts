import express from "express";
import mongoose from "mongoose";

import { UserControllers } from "./controllers";
import { authValidator } from "./validators";
import { checkAuth } from "./utils";

mongoose
  .connect("mongodb+srv://ee1Solncev:Sinetko225348@testcluster.fewa1fo.mongodb.net/blog?retryWrites=true&w=majority")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log("DB Error", e));

const app = express();

app.use(express.json());

app.post("/auth/login", UserControllers.login);

app.post("/auth/register", authValidator, UserControllers.register);

app.get("/me", checkAuth, UserControllers.getMe);

app.listen(7777, () => console.log("Server Started"));
