import nodemailer from "nodemailer";

import config from "./config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.nodeMailer.email,
    pass: config.nodeMailer.pass,
  },
});

export default transporter;
