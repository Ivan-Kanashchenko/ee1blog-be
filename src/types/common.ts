import { Request } from "express";
import mongoose from "mongoose";

export interface RequestBody<T> extends Request {
  body: T;
}

export interface DocumentResult<T> extends mongoose.Document {
  _doc: T;
}

export interface UserAuthorisedRequest extends Request {
  userId?: string;
}

export interface UserAuthorisedBodyRequest<T> extends UserAuthorisedRequest {
  body: T;
}
