import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  name: {
    type: String,
    required: [true, 'name is required!']
  },

  company: {
    type: String
  },

  website: {
    type: String
  },

  location: {
    type: String,
    required: [true, 'location is required!']
  },

  status: {
    type: String,
    required: [true, 'status is required!']
  },

  age: {
    type: Number,
    required: [true, 'age is required!']
  },

  profession: {
    type: String,
    required: [true, 'profession is required!']
  },

  skills: {
    type: [String]
  },

  bio: {
    type: String
  },

  social: {
    youtube: {
      type: String
    },

    twitter: {
      type: String
    },

    facebook: {
      type: String
    },

    linkedin: {
      type: String
    },

    instagram: {
      type: String
    },

    github: {
      type: String
    }
  },

  date: {
    type: Date,
    default: Date.now
  }
});

export default model('Profile', profileSchema);
