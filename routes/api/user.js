import { Router } from 'express';
import { check } from 'express-validator';

// IMPORT CONTROLLER
import { getUsers, getUser, addUser, deleteUser } from '../../controllers/user';

const router = Router({ strict: true });

router.get('/', getUsers);
router.get('/:id', getUser);
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
router.delete('/:id', deleteUser);

export default router;
