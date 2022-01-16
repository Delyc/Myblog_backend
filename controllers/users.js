import pkg from "http-errors";
const { BadRequest, Conflict, NotFound, Unauthorized } = pkg;

import { User } from "../models/users.js";

// get one user by id
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
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
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
    throw new NotFound("no user exist for this id");
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).send(updatedUser);
};

// delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    throw new NotFound("no user exist for this id");
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
    throw new Unauthorized("no user exist for this email");
  }

  if (user.password !== password) {
    throw new Unauthorized("wrong password");
  }

  // send json response
  res.status(200).json({
    success: true,
    data: user,
  });
};

// search for a user using firstName
export const searchUser = async (req, res) => {
  const search = req.params.search;
  try {
    // find all users with firstName that contains search - case insensitive
    const users = await User.find({ firstName: { $regex: search, $options: "i" } });
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