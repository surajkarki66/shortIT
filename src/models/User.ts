import bcrypt from "bcrypt";
import { Schema, model, Types } from "mongoose";

import {
  IUser,
  IUserDocument,
  IUserModel,
  IUserDaoResponse,
  ROLE,
  STATUS,
} from "../interfaces/user";

export const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      min: 2,
      max: 32,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      trim: true,
      min: 2,
      max: 32,
      required: [true, "lastName is required"],
    },

    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      default: "subscriber",
      enum: ROLE,
    },
    status: {
      type: String,
      default: "inactive",
      enum: STATUS,
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

userSchema.static("manualHashPassword", async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
});

userSchema.static(
  "findByEmail",
  async function (email: string): Promise<IUserDocument> {
    return await this.findOne({ email });
  }
);

userSchema.static("findMe", async function (id: string): Promise<
  IUserDocument[]
> {
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
    { $unset: "password" },
  ];
  return await this.aggregate(pipeline);
});

userSchema.static(
  "updateById",
  async function (id: string, data: any): Promise<IUserDaoResponse> {
    return new Promise((resolve, reject) => {
      const userId = Types.ObjectId(id);
      this.updateOne({ _id: userId }, { $set: data })
        .then((res: any) => {
          {
            const { nModified } = res;
            let result: IUserDaoResponse;
            if (nModified === 1) {
              result = {
                success: true,
                data: { message: "User is updated successfully" },
                statusCode: 200,
              };
              resolve(result);
            }
            result = {
              success: false,
              data: { message: "User is not found" },
              statusCode: 404,
            };
            resolve(result);
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
);

userSchema.static(
  "deleteById",
  async function (id: string): Promise<IUserDaoResponse> {
    return new Promise((resolve, reject) => {
      const userId = Types.ObjectId(id);
      this.deleteOne({ _id: userId })
        .then((res: any) => {
          const { deletedCount } = res;
          let result: IUserDaoResponse;
          if (deletedCount === 1) {
            result = {
              success: true,
              data: { message: "User is deleted successfully" },
              statusCode: 200,
            };
            resolve(result);
          }
          result = {
            success: false,
            data: { message: "User is not found" },
            statusCode: 404,
          };
          resolve(result);
        })
        .catch((error: any) => reject(error));
    });
  }
);
const User: IUserModel = model<IUser, IUserModel>("User", userSchema);

export default User;
