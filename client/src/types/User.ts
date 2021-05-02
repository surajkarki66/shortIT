import { UrlType } from "./Url";

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  urls: UrlType[];
};
