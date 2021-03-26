import { Document, Model } from 'mongoose';

export interface IUrlDocument extends Document {
	urlCode: string;
	longUrl: string;
	shortUrl: string;
	dateCreated: string;
	datesAccessed?: any[];
}

export interface IUrlModel extends Model<IUrlDocument> {
	// TODO: Static methods here
}
