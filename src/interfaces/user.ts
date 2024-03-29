import { Document, Model, Schema } from "mongoose";

export enum ROLE {
  admin = "admin",
  subscriber = "subscriber",
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
  status: STATUS | string;
  readonly role: ROLE | string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface IUser extends IUserDocument {
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IUserDaoResponse {
  success: boolean;
  data: { message: string };
  statusCode: number;
}

export interface IUserModel extends Model<IUser> {
  findByEmail: (email: string) => Promise<IUserDocument>;
  findMe: (id: string) => Promise<IUserDocument[]>;
  updateById: (id: string, data: any) => Promise<IUserDaoResponse>;
  manualHashPassword: (password: string) => Promise<string>;
  deleteById: (id: string) => Promise<IUserDaoResponse>;
}
