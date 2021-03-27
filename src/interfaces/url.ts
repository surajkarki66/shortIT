import mongoose, { Document, Model } from 'mongoose';

export interface IUrlDocument extends Document {
	userId: mongoose.Schema.Types.ObjectId;
	urlCode: string;
	longUrl: string;
	shortUrl: string;
	dateCreated: string;
	datesAccessed?: any[];
}

export interface IUrl extends IUrlDocument {
	/*@ Info: Instance Methods
	 */
}

export interface IUrlModel extends Model<IUrl> {
	/*@ Info: Static Methods
	 */
}
