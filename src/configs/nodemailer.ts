import nodemailer from "nodemailer";

import config from "./config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.nodeMailer.email,
    pass: config.nodeMailer.pass,
  },
});

export default transporter;
