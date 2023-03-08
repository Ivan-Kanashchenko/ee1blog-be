import { Request, Response } from "express";

import { ERRORS } from "../consts";
import { PostModel } from "../models";
import { PostCreate, UserAuthorisedRequest, UserAuthorisedBodyRequest } from "../types";

const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERRORS.SOMETHING_WENT_WRONG });
  }
};

const getPost = async (req: Request, res: Response) => {
  const _id = req.params?.id;
  try {
    const doc = await PostModel.findOneAndUpdate({ _id }, { $inc: { viewsCount: 1 } }, { returnDocument: "after" });

    if (!doc) {
      return res.status(404).json({ message: ERRORS.DOCUMENT_NOT_FOUNT });
    }
    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERRORS.SOMETHING_WENT_WRONG });
  }
};

const createPost = async (req: UserAuthorisedBodyRequest<PostCreate>, res: Response) => {
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

const updatePost = async (req: UserAuthorisedBodyRequest<PostCreate>, res: Response) => {
  const _id = req.params?.id;
  try {
    await PostModel.findOneAndUpdate(
      { _id, user: { _id: req.userId } },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERRORS.SOMETHING_WENT_WRONG });
  }
};

const removePost = async (req: UserAuthorisedRequest, res: Response) => {
  const _id = req.params?.id;
  try {
    await PostModel.findOneAndDelete({ _id, user: { _id: req.userId } });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERRORS.SOMETHING_WENT_WRONG });
  }
};

export const PostControllers = {
  createPost,
  getPosts,
  getPost,
  removePost,
  updatePost,
};
