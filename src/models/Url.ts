import { Schema, model, Types } from "mongoose";

import {
  IUrlModel,
  IUrl,
  IUrlDaoResponse,
  IUrlDocument,
} from "../interfaces/url";

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
  async function (longUrl: string, id: string): Promise<IUrlDocument> {
    const userId = Types.ObjectId(id);
    return await this.findOne({ longUrl, userId });
  }
);

urlSchema.static(
  "findByCode",
  async function (code: string): Promise<IUrlDocument> {
    return await this.findOne({ code });
  }
);

urlSchema.static(
  "updateAccessedDatesById",
  async function (id: Schema.Types.ObjectId, data: any) {
    return await this.updateOne({ _id: id }, { $push: data });
  }
);

urlSchema.static(
  "deleteById",
  async function (id: string): Promise<IUrlDaoResponse> {
    return new Promise((resolve, reject) => {
      const urlId = Types.ObjectId(id);
      this.deleteOne({ _id: urlId })
        .then((res: any) => {
          const { deletedCount } = res;
          let result: IUrlDaoResponse;
          if (deletedCount === 1) {
            result = {
              status: "success",
              data: { message: "Url is deleted successfully" },
              statusCode: 200,
            };
            resolve(result);
          }
          result = {
            status: "failed",
            data: { message: "Url is not found" },
            statusCode: 404,
          };
          resolve(result);
        })
        .catch((error: any) => reject(error));
    });
  }
);

urlSchema.static(
  "updateById",
  async function (id: string, data: any): Promise<IUrlDaoResponse> {
    return new Promise((resolve, reject) => {
      const urlId = Types.ObjectId(id);
      this.updateOne({ _id: urlId }, { $set: data })
        .then((res: any) => {
          {
            const { nModified } = res;
            let result: IUrlDaoResponse;
            if (nModified === 1) {
              result = {
                status: "success",
                data: { message: "Url is updated successfully" },
                statusCode: 200,
              };
              resolve(result);
            }
            result = {
              status: "failed",
              data: { message: "Url is not found" },
              statusCode: 404,
            };
            resolve(result);
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
);

urlSchema.static("deleteByUserId", async function (userId: string) {
  return await this.deleteMany({ userId: Types.ObjectId(userId) });
});
const UrlModel: IUrlModel = model<IUrl, IUrlModel>("Url", urlSchema);

export default UrlModel;
