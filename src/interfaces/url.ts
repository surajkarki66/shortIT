import { Document, Model, Schema } from "mongoose";

export interface IUrlDocument extends Document {
  readonly _id: Schema.Types.ObjectId;
  title: string;
  readonly userId: Schema.Types.ObjectId;
  longUrl: string;
  shortUrl: string;
  code: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  accessedDates?: Date[];
}

export interface IUrl extends IUrlDocument {
  instanceMethod?: () => void;
}

export interface IUrlDaoResponse {
  success: boolean;
  data: { message: string };
  statusCode: number;
}

export interface IUrlModel extends Model<IUrl> {
  findByLongUrlAndUserId: (
    longUrl: string,
    userId: string
  ) => Promise<IUrlDocument>;
  findByCode: (code: string) => Promise<IUrlDocument>;
  updateAccessedDatesById: (
    id: Schema.Types.ObjectId,
    data: any
  ) => Promise<any>;
  updateById: (id: string, data: any) => Promise<IUrlDaoResponse>;
  deleteById: (id: string) => Promise<IUrlDaoResponse>;
  deleteByUserId: (userId: string) => Promise<void>;
}
