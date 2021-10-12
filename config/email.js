const nodemailer = require("nodemailer");
require("dotenv").config();

const smtpTransport = nodemailer.createTransport({
  service: "naver",
  port: 587,
  secure: false,
  auth: {
    user: process.env.email,
    pass: process.env.email_pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

console.log(process.env.email);
module.exports = {
  smtpTransport,
};
