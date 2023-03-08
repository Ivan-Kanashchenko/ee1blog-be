import { postCreateValidator } from "./validators/postValidator";
import express from "express";
import mongoose from "mongoose";

import { PostControllers, UserControllers } from "./controllers";
import { singUpValidator, singInValidator } from "./validators";
import { checkAuth } from "./utils";
import { ROUTES } from "./consts";

mongoose
  .connect("mongodb+srv://ee1Solncev:Sinetko225348@testcluster.fewa1fo.mongodb.net/blog?retryWrites=true&w=majority")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log("DB Error", e));

const app = express();

app.use(express.json());

app.post(ROUTES.LOGIN, singInValidator, UserControllers.login);
app.post(ROUTES.REGISTER, singUpValidator, UserControllers.register);
app.get(ROUTES.ME, checkAuth, UserControllers.getMe);

app.get(ROUTES.POSTS, PostControllers.getPosts);
app.get(`${ROUTES.POSTS}/:id`, PostControllers.getPostById);
app.post(ROUTES.POSTS, checkAuth, postCreateValidator, PostControllers.createPost);

app.listen(7777, () => console.log("Server Started"));
