import { Schema, model, Types } from "mongoose";

import { IUrlModel, IUrl } from "./../interfaces/url";

const urlSchema = new Schema<IUrl>(
  {
    title: { type: String, min: 2, max: 255 },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    code: { type: String, required: true, min: 6, max: 6 },
    accessedDates: Array,
  },
  { timestamps: true }
);

urlSchema.static(
  "findByLongUrlAndUserId",
  async function (longUrl: string, id: string) {
    const userId = Types.ObjectId(id);
    return await this.findOne({ longUrl, userId });
  }
);

urlSchema.static("findByCode", async function (code: string) {
  return await this.findOne({ code });
});

urlSchema.static(
  "updateAccessedDatesById",
  async function (id: Schema.Types.ObjectId, data: any) {
    return await this.updateOne({ _id: id }, { $push: data });
  }
);

const UrlModel: IUrlModel = model<IUrl, IUrlModel>("Url", urlSchema);

export default UrlModel;
