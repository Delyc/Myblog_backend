import { User } from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// get one user by id
export const getUserById = async (req, res) => { 
  if (!req.params.id) {
    return res
      .status(404)
      .json({ success: false, data: { message: "Oops, missing user id" } });
  }

  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      data: {
        message: "no user exists for this id",
      },
    });
  }
  res.status(200).json({
    success: true,
    data: {
      data: user,
    },
  });
};

// create a new user
export const createUser = async (req, res) => {
  const email = req.body.email;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      data: { message: "A user with this email already exist" },
    });
  }

  try {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const Obj = new User({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await User.create(Obj);
    res.status(201).json({ success: true, data :{message: "account successfully created"} });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      success: false,
      data: { message: error.properties },
    });
  }
};

// fetch all users
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
};

// update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ data: { message: "No such id exists" } });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({
      success: false,
      data: { message: "No user with this id exists" },
    });
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    data: { message: "User updated successfully" },
  });
};

// delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({
      success: false,
      data: { message: "No user with this id exists" },
    });
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    data: { message: "User deleted successfully" },
  });
};

// login a user
export const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      success: false,
      data: { message: "No user with this email exists" },
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      data: { message: "Incorrect password" },
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
    data: {message: "successfully logged in",
          email: req.body.email},
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
        data: { message: "No user with this firstName exists" },
      });
    }
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: { message: "Something went wrong ..." },
    });
  }
};
