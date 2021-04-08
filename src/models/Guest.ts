import { IUrlDocument } from "interfaces/url";
import { Schema, model } from "mongoose";

import { IGuestUrlModel, IGuestUrl } from "../interfaces/guest";

const guestUrlSchema = new Schema<IGuestUrl>(
  {
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    code: { type: String, required: true },
  },
  { timestamps: true }
);

guestUrlSchema.static(
  "findByLongUrl",
  async function (longUrl: string): Promise<IUrlDocument> {
    return await this.findOne({ longUrl });
  }
);

guestUrlSchema.static(
  "findByCode",
  async function (code: string): Promise<IUrlDocument> {
    return await this.findOne({ code });
  }
);

const GuestUrlModel: IGuestUrlModel = model<IGuestUrl, IGuestUrlModel>(
  "GuestUrl",
  guestUrlSchema
);

export default GuestUrlModel;
