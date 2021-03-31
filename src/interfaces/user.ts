import { Document, Model, Schema, Types } from 'mongoose';

export interface IUserDocument extends Document {
	/*@ Info: Schema
	 */
	_id: string;
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
	findMe: (id: Types.ObjectId) => Promise<IUserDocument[]>;
}
