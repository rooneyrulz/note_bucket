import { Router } from 'express';
import { check } from 'express-validator';

// IMPORT CONTROLLER
import {
  getNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
  getNoteByUser
} from '../../controllers/note';

// IMPORT AUTH MIDDLEWARE
import isAuth from '../../middleware/auth';

const router = Router({ strict: true });

// ROUTE            >     GET  /api/notes
// DESC             >     GET ALL NOTES
// ACCESS CONTROL   >     PUBLIC
router.get('/', getNotes);

// ROUTE            >     GET  /api/notes/:id
// DESC             >     GET NOTE BY ID
// ACCESS CONTROL   >     PUBLIC
router.get('/:id', getNote);

// ROUTE            >     GET  /api/notes/user/notes
// DESC             >     GET NOTE BY USER ID
// ACCESS CONTROL   >     PRIVATE
router.get('/user/notes', isAuth, getNoteByUser);

// ROUTE            >     POST  /api/notes/add
// DESC             >     ADD NOTES
// ACCESS CONTROL   >     PRIVATE
router.post(
  '/add',
  isAuth,
  [
    check('title', 'Please enter a valid title!')
      .not()
      .isEmpty(),
    check('text', 'Please enter some text!')
      .not()
      .isEmpty()
  ],
  addNote
);

// ROUTE            >     PUT  /api/notes/:id
// DESC             >     UPDATE NOTE
// ACCESS CONTROL   >     PRIVATE
router.put(
  '/:id',
  isAuth,
  [
    check('title', 'Please enter a valid title!')
      .not()
      .isEmpty(),
    check('text', 'Please enter some text!')
      .not()
      .isEmpty()
  ],
  updateNote
);

// ROUTE            >     DELETE  /api/notes/:id
// DESC             >     DELETE NOTE
// ACCESS CONTROL   >     PRIVATE
router.delete('/:id', isAuth, deleteNote);

export default router;
