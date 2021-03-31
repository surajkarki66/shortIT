import mongoose, { Document, Model } from 'mongoose';

export interface IUrlDocument extends Document {
	userId: mongoose.Schema.Types.ObjectId;
	longUrl: string;
	shortUrl: string;
	code: string;
	createdAt: Date;
	updatedAt: Date;
	expireAt: Date;
	accessedDates?: Date[];
}

export interface IUrl extends IUrlDocument {
	/*@ Info: Instance Methods
	 */
	dummy?: () => void;
}

export interface IUrlModel extends Model<IUrl> {
	/*@ Info: Static Methods
	 */
	findByLongUrl: (longUrl: string) => Promise<IUrlDocument>;
	findByCode: (code: string) => Promise<IUrlDocument>;
	updateAccessedDatesById: (id: mongoose.Schema.Types.ObjectId, data: any) => Promise<void>;
}
