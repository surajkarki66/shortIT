import { Document, Model, Schema } from "mongoose";

export interface IUserDocument extends Document {
  readonly _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
