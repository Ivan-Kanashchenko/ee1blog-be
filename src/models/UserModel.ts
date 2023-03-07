import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    mail: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", UserSchema);
