import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

import { ERRORS } from "../consts";
import { Token, UserRequest } from "../types";

export const checkAuth = (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (!token) return res.status(401).json({ message: ERRORS.ACCESS_DENIED });

    const decoded = jwt.verify(token, "secretKey") as Token;

    req.userId = decoded._id;

    next();
  } catch (error) {
    res.status(500).json({ message: ERRORS.SOMETHING_WENT_WRONG });
  }
};
