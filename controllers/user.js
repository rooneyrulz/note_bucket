import mongoose from 'mongoose';
import { sign } from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { validationResult } from 'express-validator';

// IMPORT MODELS
import User from '../models/User';
import Note from '../models/Note';

// ROUTE            >     GET  /api/users
// DESC             >     GET ALL USERS
// ACCESS CONTROL   >     PUBLIC
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .sort({ date: -1 })
      .exec();

    if (users.length < 1) return res.status(409).send('Users not found!');

    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     GET  /api/user/:id
// DESC             >     GET USER BY ID
// ACCESS CONTROL   >     PUBLIC
export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).exec();

    if (!user) return res.status(409).send('User not found!');

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     POST  /api/users/add
// DESC             >     ADD USERS
// ACCESS CONTROL   >     PUBLIC
export const addUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  const { username, email, password, password2 } = req.body;

  if (password !== password2)
    return res.status(400).send('Password is not match!');

  try {
    const isUsername = await User.findOne({ username }).exec();

    if (isUsername) return res.status(400).send('Username already exist!');

    const isEmail = await User.findOne({ email }).exec();

    if (isEmail) return res.status(400).send('Email already exist!');

    const hashedPwd = await hash(password, 12);

    const newUser = new User({
      _id: mongoose.Types.ObjectId(),
      username,
      email,
      password: hashedPwd,
    });

    const user = await newUser.save();

    const token = await sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: '360000',
    });

    return res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     DELETE  /api/users/:id
// DESC             >     DELETE USER
// ACCESS CONTROL   >     PRIVATE
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).exec();

    if (!user) return res.status(409).send('User not found!');

    const notes = Note.find({ user: req.user.id }).exec();

    if (notes.length > 0) await Note.deleteMany({ user: req.user.id });

    await user.remove();

    return res.status(200).send('User deleted successfully!');
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};
