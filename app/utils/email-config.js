const nodemailer = require("nodemailer");
require("dotenv").config();
const config = require("../../config");

const {
  emailService: { service, auth, campaignEmail },
} = config(process.env.NODE_ENV);

const transporter = nodemailer.createTransport({
  service: service,
  auth: {
    user: auth.user,
    pass: auth.pass,
  },
});

const sendEmail = ({ to, subject, message }) => {
  transporter.sendMail(
    {
      from: campaignEmail.email,
      to,
      subject,
      text: message,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

module.exports = sendEmail;
