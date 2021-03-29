import mongoose, { Schema } from 'mongoose';

import { IUrlModel, IUrl } from './../interfaces/url';

const urlSchema = new Schema<IUrl>({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
	code: { type: String, require: true },
	longUrl: { type: String, require: true },
	shortUrl: { type: String, require: true },
	dateCreated: { type: String, default: new Date() },
	datesAccessed: Array,
});

urlSchema.static('findByLongUrl', async function (longUrl: string) {
	return await this.findOne({ longUrl });
});

urlSchema.static('findByCode', async function (code: string) {
	return await this.findOne({ code });
});

const UrlModel: IUrlModel = mongoose.model<IUrl, IUrlModel>('Url', urlSchema);

export default UrlModel;
