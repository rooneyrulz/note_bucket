import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

// IMPORT MODELS
import User from '../models/User';
import Note from '../models/Note';

// ROUTE            >     GET  /api/notes
// DESC             >     GET ALL NOTES
// ACCESS CONTROL   >     PUBLIC
export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find()
      .sort({ date: -1 })
      .exec();

    if (notes.length < 1) return res.status(409).send('Notes not found!');

    return res.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     GET  /api/notes/:id
// DESC             >     GET NOTE BY ID
// ACCESS CONTROL   >     PUBLIC
export const getNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id).exec();

    if (!note) return res.status(409).send('Notes not found!');

    return res.status(200).json(note);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     GET  /api/notes/:userId
// DESC             >     GET NOTE BY USER
// ACCESS CONTROL   >     PRIVATE
export const getNoteByUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const notes = await Note.find({ user: id })
      .sort({ date: -1 })
      .exec();

    if (notes.length < 1) return res.status(409).send('Notes not found!');

    return res.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     POST  /api/notes/add
// DESC             >     ADD NOTES
// ACCESS CONTROL   >     PRIVATE
export const addNote = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  const { title, text } = req.body;
  try {
    const user = await User.findById(req.user.id).exec();

    if (!user) return res.status(401).send('No user, Not authorized!');

    const newNote = new Note({
      _id: mongoose.Types.ObjectId(),
      user: user.id,
      title,
      text,
    });

    const note = await newNote.save();

    user.notes.unshift({ note: note.id });

    await user.save();

    return res.status(201).json(note);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};
