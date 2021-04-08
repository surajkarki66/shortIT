import { ROLE } from "../../interfaces/user";

export interface ITokenPayload {
  readonly _id: string;
  readonly role: ROLE;
  iat: number;
  exp: number;
  error: string;
}
