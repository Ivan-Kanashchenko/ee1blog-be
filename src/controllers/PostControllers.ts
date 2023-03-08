import { Request, Response } from "express";

import { ERRORS } from "../consts";
import { PostModel } from "../models";
import { UserRequestWithId, PostCreate } from "../types";

const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERRORS.SOMETHING_WENT_WRONG });
  }
};

const createPost = async (req: UserRequestWithId<PostCreate>, res: Response) => {
  try {
    const post = await new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    }).save();

    res.json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERRORS.SOMETHING_WENT_WRONG });
  }
};

export const PostControllers = {
  createPost,
  getPosts,
};