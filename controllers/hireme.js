import pkg from "http-errors";
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
    res.status(201).json({ success: true, message: "Thanks for contacting me" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "check if all fields are filled",
    });
  }
};