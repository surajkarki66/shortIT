import { Document, Model, Schema } from 'mongoose';

export interface IGuestUrlDocument extends Document {
	_id: Schema.Types.ObjectId;
	longUrl: string;
	shortUrl: string;
	code: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGuestUrl extends IGuestUrlDocument {
	/*@ Info: Instance Methods
	 */
	dummy?: () => void;
}

export interface IGuestUrlModel extends Model<IGuestUrl> {
	/*@ Info: Static Methods
	 */
	findByLongUrl: (longUrl: string) => Promise<IGuestUrlDocument>;
	findByCode: (code: string) => Promise<IGuestUrlDocument>;
}
