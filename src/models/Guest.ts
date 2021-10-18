import { IUrlDocument } from "interfaces/url";
import { Schema, model } from "mongoose";

import { IGuestUrlModel, IGuestUrl } from "../interfaces/guest";

const guestUrlSchema = new Schema<IGuestUrl>(
  {
    longUrl: {
      type: String,
      trim: true,
      required: [true, "longUrl is required"],
    },
    shortUrl: {
      type: String,
      trim: true,
      required: [true, "shortUrl is required"],
    },
    code: { type: String, trim: true, required: [true, "code is required"] },
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
