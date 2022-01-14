import pkg from "http-errors";
const { BadRequest, Conflict, NotFound, Unauthorized } = pkg;

import { User } from "../models/users.js";

export const getUserById = async (req, res) => {
  if (!req.params.id) {
    throw new BadRequest("Missing user id");
  }

  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    throw new BadRequest("no user exist for this id");
  }
  res.status(200).send(user);
};

export const createUser = async (req, res) => {
  const email = req.body.email;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "A user with this email already exist",
    });
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something is wrong...",
    });
  }
};
