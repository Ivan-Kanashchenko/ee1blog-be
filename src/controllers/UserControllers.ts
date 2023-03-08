import bcrypt from "bcrypt";
import { Response } from "express";
import { validationResult } from "express-validator";

import { UserModel } from "../models";

import { ERRORS } from "../consts";
import { createToken } from "../utils";
import { DocumentResult, ILogin, IRegister, RequestBody, User, UserRequest } from "../types";

const login = async (req: RequestBody<ILogin>, res: Response) => {
  try {
    const user = await UserModel.findOne({ mail: req.body.mail });

    if (!user) return res.status(404).json({ message: ERRORS.USER_NOT_FOUND });

    const isValidPass = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPass) return res.status(404).json({ message: ERRORS.USER_NOT_FOUND });

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
    res.status(500).json({ message: ERRORS.SOMETHING_WENT_WRONG });
  }
};

const register = async (req: RequestBody<IRegister>, res: Response) => {
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
    res.status(500).json({ message: ERRORS.SOMETHING_WENT_WRONG });
  }
};

const getMe = async (req: UserRequest, res: Response) => {
  try {
    const user: DocumentResult<User> = await UserModel.findOne({ _id: req.userId });

    if (!user)
      return res.status(404).json({
        message: ERRORS.USER_NOT_FOUND,
      });

    res.status(200).json({
      ...user._doc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERRORS.SOMETHING_WENT_WRONG });
  }
};

export const UserControllers = {
  login,
  register,
  getMe,
};
