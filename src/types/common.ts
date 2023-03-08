import { Request } from "express";
import mongoose from "mongoose";

export interface RequestBody<T> extends Request {
  body: T;
}

export interface DocumentResult<T> extends mongoose.Document {
  _doc: T;
}

export interface UserRequestWithId<T> extends Request {
  body: T;
  userId: string;
}
