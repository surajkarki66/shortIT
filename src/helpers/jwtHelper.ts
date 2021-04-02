import jwt from "jsonwebtoken";

import config from "../configs/config";

const signToken = (payload: { _id: string }, expiresIn: string): string => {
  const secret = String(config.jwtSecret);
  const options = {
    expiresIn: expiresIn,
    issuer: "shortIt.com",
  };
  return jwt.sign(payload, secret, options);
};
const verifyToken = async (token: string, secretKey: string): Promise<void> => {
  return jwt.verify(token, secretKey, (error, response) => {
    if (error) {
      if (String(error).startsWith("TokenExpiredError")) {
        return { error: "Expired link. Signup again." };
      }
      if (String(error).startsWith("JsonWebTokenError")) {
        return { error: "Invalid token." };
      }
    }
    return response;
  });
};
export { signToken, verifyToken };
