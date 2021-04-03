import { Document, Model, Schema } from "mongoose";

export interface IUrlDocument extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  userId: Schema.Types.ObjectId;
  longUrl: string;
  shortUrl: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  accessedDates?: Date[];
}

export interface IUrl extends IUrlDocument {
  /*@ Info: Instance Methods
   */
  dummy?: () => void;
}

export interface IUrlModel extends Model<IUrl> {
  /*@ Info: Static Methods
   */
  findByLongUrlAndUserId: (
    longUrl: string,
    userId: string
  ) => Promise<IUrlDocument>;
  findByCode: (code: string) => Promise<IUrlDocument>;
  updateAccessedDatesById: (
    id: Schema.Types.ObjectId,
    data: any
  ) => Promise<void>;
}
