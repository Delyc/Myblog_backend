import pkg from "http-errors";
import nodemailer from 'nodemailer';
const { BadRequest, Conflict, NotFound, Unauthorized } = pkg;

import { hire } from "../models/hireme.js";

// create a query
export const hireMe = async (req, res) => {
  // check if message is empty
  if (!req.body.message) {
    
    // throw new BadRequest("Missing message");
  }
  try {
    const query = await hire.create(req.body);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    let mailOptions = {
      from: `${req.body.fullname}`  ,
      to: process.env.MAIL_USERNAME,
      subject: `Job`,
      text:`${req.body.email} 
      ${req.body.job}`
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });



    res.status(201).json({ success: true, data:{message: "Thanks for contacting me" } });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data:{message: "check if all fields are filled"},
    });
  }
};