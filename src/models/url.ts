import mongoose, { Schema } from 'mongoose';

import { IUrlModel, IUrl } from './../interfaces/url';

const urlSchema = new Schema<IUrl>({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
	urlCode: { type: String, require: true },
	longUrl: { type: String, require: true },
	shortUrl: { type: String, require: true },
	dateCreated: { type: String, default: new Date() },
	datesAccessed: Array,
});

const UrlModel: IUrlModel = mongoose.model<IUrl, IUrlModel>('Url', urlSchema);

export default UrlModel;
