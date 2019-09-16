import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// IMPORT MODELS
import User from '../models/User';

// ROUTE            >     POST  /api/users/auth
// DESC             >     AUTHENTICATE USER
// ACCESS CONTROL   >     PUBLIC
export const authenticateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();

    if (!user) return res.status(400).send('No user found!');

    const isMatch = await compare(password, user.password);

    if (!isMatch) return res.status(400).send('Password does not match!');

    const token = await sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: '360000',
    });

    return res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     GET  /api/users/auth/user
// DESC             >     GET AUTHENTICATED USER
// ACCESS CONTROL   >     PRIVATE
export const getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).exec();

    if (!user) return res.status(401).send('No user, Not authenticated!');

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};
