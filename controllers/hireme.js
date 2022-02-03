import { response } from "express";
import pkg from "http-errors";
import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
const { BadRequest, Conflict, NotFound, Unauthorized } = pkg;

import { hire } from "../models/hireme.js";


dotenv.config();

// create a query
export const hireMe = async (req, res) => {
  console.log(req.body);
  if (!req.body.message) {
    
    // throw new BadRequest("Missing message");
  }
  try {
    const query = await hire.create(req.body);





    
 

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "delycetwizeyimana@gmail.com", // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });


  let info = await transporter.sendMail({
    from: `${req.body.name} <delyce2002@gmail.com>`, // sender address
    to: "d.twizeyima@alustudent.com", // list of receivers
    subject: "contactme", // Subject line
    text: req.body.email, // plain text body
    html: `${req.body.email} <br> ${req.body.name} <br> ${req.body.message}`
    
  });

  

  // send mail with defined transport object
 



  res.status(201).json({ success: true, data:{message: "Thanks for contacting me" } });





    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data:{message: error.message},
    });
  }
};