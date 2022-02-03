import { Queries } from "../models/queries.js";
import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
import pkg from "http-errors";








dotenv.config();
// create a query
export const CreateQuery = async (req, res) => {
  // check if message is empty
  if (!req.body.message) {
    return res.status(400).json({
      success: false,
      message: "Missing message",
    });
  }
  try {
    const query = await Queries.create(req.body);
    




    
 

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

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${req.body.fullname}`, // sender address
    to: "d.twizeyima@alustudent.com", // list of receivers
    subject: "Query", // Subject line
    text: req.body.email, // plain text body
    html: `${req.body.email} <br> ${req.body.fullname}<br> ${req.body.message}`
    
  });




  res.status(201).json({ success: true, data:{message: "Thanks for contacting me" } });



  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Fill all fields correctly!",
    });
  }
};

// delete a query
export const DeleteQuery = async (req, res) => {
  const id = req.params.id;
  const query = await Queries.findById(id.toString());

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "No query found",
    });
  }

  try {
    await Queries.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: {
        message: "Query deleted",
        queryId: req.params.id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something is wrong...",
    });
  }
};

// get all queries
export const GetAllQueries = async (req, res) => {
  const queries = await Queries.find();
  res.status(200).send(queries);
};

// getting one query
export const getQueryById = async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      message: "missing query id",
    });
  }

  const id = req.params.id;
  const query = await Queries.findById(id);

  if (!query) {
    return res.status(500).json({
      success: false,
      message: "not found",
    });
  }
  res.status(200).json({
    success: true,
    data: {
      data: query,
    },
  });
};

// search queries
export const SearchQueries = async (req, res) => {
  const queries = await Queries.find({
    $text: { $search: req.query.q },
  });
  res.status(200).json({
    success: true,
    data: queries,
  });
};
