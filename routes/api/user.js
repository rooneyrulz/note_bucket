import { Router } from 'express';
import { check } from 'express-validator';

// IMPORT CONTROLLER
import { getUsers, getUser, addUser, deleteUser } from '../../controllers/user';

// IMPORT AUTH MIDDLEWARE
import isAuth from '../../middleware/auth';

const router = Router({ strict: true });

// ROUTE            >     GET  /api/users
// DESC             >     GET ALL USERS
// ACCESS CONTROL   >     PUBLIC
router.get('/', getUsers);

// ROUTE            >     GET  /api/user/:id
// DESC             >     GET USER BY ID
// ACCESS CONTROL   >     PUBLIC
router.get('/:id', getUser);

// ROUTE            >     POST  /api/users/add
// DESC             >     ADD USERS
// ACCESS CONTROL   >     PUBLIC
router.post(
  '/add',
  [
    check('username', 'Please enter a valid username!')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email!').isEmail(),
    check('password', 'Please enter a password!')
      .not()
      .isEmpty(),
    check('password', 'Password must be 8 charactors long!').isLength({
      min: 8,
    }),
  ],
  addUser
);

// ROUTE            >     DELETE  /api/users/:id
// DESC             >     DELETE USER
// ACCESS CONTROL   >     PRIVATE
router.delete('/:id', isAuth, deleteUser);

export default router;
