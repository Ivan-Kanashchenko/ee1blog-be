import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface UserRequest extends Request {
  userId: string | JwtPayload;
}

export interface ILogin {
  mail: string;
  password: string;
}
export interface IRegister extends ILogin {
  mail: string;
  password: string;
  fullName: string;
}

export interface Token extends JwtPayload {
  _id: string;
}

export interface User {
  _id: string;
  fullName: string;
  mail: string;
  password: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
