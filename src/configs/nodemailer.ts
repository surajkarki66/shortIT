import nodemailer from "nodemailer";

import config from "./config";

const nodeMailer = async () => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.nodeMailer.email,
      pass: config.nodeMailer.pass,
    },
    port: 465,
    host: "smtp.gmail.com",
  });
  return transport;
};

export default nodeMailer;
