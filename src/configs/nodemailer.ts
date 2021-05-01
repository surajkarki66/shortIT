import nodemailer from "nodemailer";

import config from "./config";

const nodeMailer = async (accessToken: any) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.nodeMailer.email,
      clientId: config.oauth.CLIENT_ID,
      clientSecret: config.oauth.CLIENT_SECRET,
      refreshToken: config.oauth.REFRESH_TOKEN,
      accessToken: String(accessToken.token),
    },
  });
  return transport;
};

export default nodeMailer;
