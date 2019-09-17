import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },

  notes: [
    {
      note: {
        type: Schema.Types.ObjectId,
        ref: 'Note',
      },
    },
  ],

  username: {
    type: String,
    unique: true,
    required: [true, 'username is required!'],
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'email is required!'],
  },

  password: {
    type: String,
    unique: true,
    required: [true, 'password is required!'],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('User', userSchema);
