import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },

  title: {
    type: String,
    required: [true, 'title is required!'],
  },

  text: {
    type: String,
    required: [true, 'text is required!'],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('Note', noteSchema);
