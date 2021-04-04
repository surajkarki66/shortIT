import { Document, Model, Schema } from "mongoose";

export interface IGuestUrlDocument extends Document {
  readonly _id: Schema.Types.ObjectId;
  longUrl: string;
  shortUrl: string;
  code: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface IGuestUrl extends IGuestUrlDocument {
  instanceMethod?: () => void;
}

export interface IGuestUrlModel extends Model<IGuestUrl> {
  findByLongUrl: (longUrl: string) => Promise<IGuestUrlDocument>;
  findByCode: (code: string) => Promise<IGuestUrlDocument>;
}
