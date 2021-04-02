import { Document, Model, Schema } from "mongoose";

export interface IUserDocument extends Document {
  /*@ Info: Schema
   */
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUser extends IUserDocument {
  /*@ Info: Instance Methods
   */
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  /*@ Info: Static Methods
   */
  findByEmail: (email: string) => Promise<IUserDocument>;
  findMe: (id: string) => Promise<IUserDocument[]>;
}
