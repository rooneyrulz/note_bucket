import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },

  user: {
    type: Schema.Types.ObjectId,
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
