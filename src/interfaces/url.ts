import { Document, Model } from 'mongoose';

export interface IUrlDocument extends Document {
	code: string;
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
	findByLongUrl: (longUrl: string) => Promise<IUrlDocument>;
	findByCode: (code: string) => Promise<IUrlDocument>;
}
