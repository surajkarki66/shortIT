import bcrypt from "bcrypt";
import { Schema, model, Types } from "mongoose";

import { IUser, IUserModel } from "../interfaces/user";

export const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      min: 2,
      max: 32,
      required: true,
    },
    lastName: {
      type: String,
      min: 2,
      max: 32,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.method("comparePassword", async function (password: string) {
  return await bcrypt.compare(password, this.password);
});

userSchema.static("findByEmail", async function (email: string) {
  return await this.findOne({ email });
});

userSchema.static("findMe", async function (id: string) {
  const userId = Types.ObjectId(id);
  const pipeline = [
    {
      $match: {
        _id: userId,
      },
    },
    {
      $lookup: {
        from: "urls",
        localField: "_id",
        foreignField: "userId",
        as: "urls",
      },
    },
  ];
  return await this.aggregate(pipeline);
});

const User: IUserModel = model<IUser, IUserModel>("User", userSchema);

export default User;
