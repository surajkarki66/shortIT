import { Document, Model, Schema } from "mongoose";

export enum ROLE {
  admin = "admin",
  user = "user",
}

export enum STATUS {
  active = "active",
  inactive = "inactive",
}

export interface IUserDocument extends Document {
  readonly _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: STATUS;
  readonly role: ROLE;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface IUser extends IUserDocument {
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  findByEmail: (email: string) => Promise<IUserDocument>;
  findMe: (id: string) => Promise<IUserDocument[]>;
}
