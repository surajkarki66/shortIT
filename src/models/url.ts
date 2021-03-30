import mongoose, { Schema } from 'mongoose';

import { IUrlModel, IUrl } from './../interfaces/url';

const urlSchema = new Schema<IUrl>(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		longUrl: { type: String, required: true },
		shortUrl: { type: String, required: true },
		code: { type: String, min: 6, max: 6 },
		expireAt: {
			type: Date,
			default: new Date().setDate(new Date().getDate() + 1),
		},
		isExpire: { type: Boolean, default: false },
		accessedDates: Array,
	},
	{ timestamps: true },
);

urlSchema.static('findByLongUrl', async function (longUrl: string) {
	return await this.findOne({ longUrl });
});

urlSchema.static('findByCode', async function (code: string) {
	return await this.findOne({ code });
});

urlSchema.static('updateById', async function (id: string, data: any) {
	return await this.updateOne(
		{ _id: id },
		{
			$push: data,
		},
	);
});

const UrlModel: IUrlModel = mongoose.model<IUrl, IUrlModel>('Url', urlSchema);

export default UrlModel;
