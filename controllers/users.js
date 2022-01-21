import pkg from "http-errors";
const { BadRequest, Conflict, NotFound, Unauthorized } = pkg;
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { User } from "../models/users.js";

// get one user by id
export const getUserById = async (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({success: false, message : "Oops, missing user id"});
   
  }

  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({success: false, message : "no user exists for this id"});
 
  }
  res.status(200).send(user);
};

// create a new user
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
    res.status(201).json({ success: true, message: "Account successfully created" });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "fillin all fields properly",
    });
  }
};

// fetch all users
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};

// update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "not found" });
    // throw new NotFound("no user exist for this id");
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json({success: true, message: "you have successfully updated your information"});
};

// delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({message : "no user exist for this id"})
    
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: `user with id ${id} deleted`,
  });
};

// login a user
export const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Wrong email",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Wrong password",
    });
  }

  // generating token
  let authToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.AUTH_KEY,
    { expiresIn: "1h" }
  );

  // send json response
  res.status(200).json({
    success: true,
    data: user,
    token: authToken,
  });
};

// search for a user using firstName
export const searchUser = async (req, res) => {
  const search = req.params.search;
  try {
    // find all users with firstName that contains search - case insensitive
    const users = await User.find({
      firstName: { $regex: search, $options: "i" },
    });
    // const users = await User.find({ firstName: search });
    if (users.length === 0) {
      res.status(404).json({
        success: false,
        message: "no user found",
      });
    }
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
