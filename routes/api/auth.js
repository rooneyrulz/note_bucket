import { Router } from 'express';
import { check } from 'express-validator';

// IMPORT CONTROLLER
import { authenticateUser, getAuthUser } from '../../controllers/auth';

// IMPORT AUTH MIDDLEWARE
import isAuth from '../../middleware/auth';

const router = Router({ strict: true });

// ROUTE            >     POST  /api/users/auth
// DESC             >     AUTHENTICATE USER
// ACCESS CONTROL   >     PUBLIC
router.post(
  '/',
  [
    check('username', 'Please enter username!')
      .not()
      .isEmpty(),
    check('password', 'Please enter password!')
      .not()
      .isEmpty(),
  ],
  authenticateUser
);

// ROUTE            >     GET  /api/users/auth/user
// DESC             >     GET AUTHENTICATED USER
// ACCESS CONTROL   >     PRIVATE
router.get('/user', isAuth, getAuthUser);

export default router;
