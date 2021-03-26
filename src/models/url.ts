import mongoose, { Schema } from 'mongoose';

import { IUrlDocument, IUrlModel } from './../interfaces/url';

const urlSchema: Schema = new Schema({
	urlCode: { type: String, require: true },
	longUrl: { type: String, require: true },
	shortUrl: { type: String, require: true },
	dateCreated: { type: String, default: new Date() },
	datesAccessed: Array,
});

const UrlModel: IUrlModel = mongoose.model<IUrlDocument, IUrlModel>('Url', urlSchema);

export default UrlModel;
