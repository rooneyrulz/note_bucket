import { Router } from 'express';
import { check } from 'express-validator';

// IMPORT CONTROLLER
import {
  getProfiles,
  getProfile,
  getMyProfile,
  createOrUpdateProfile,
  deleteProfile
} from '../../controllers/profile';

// IMPORT AUTH MIDDLEWARE
import isAuth from '../../middleware/auth';

const router = Router({ strict: true });

// ROUTE            >     GET  /api/profiles
// DESC             >     GET ALL PROFILES
// ACCESS CONTROL   >     PUBLIC
router.get('/', getProfiles);

// ROUTE            >     GET  /api/profiles/me
// DESC             >     GET AUTH USER PROFILE
// ACCESS CONTROL   >     PRIVATE
router.get('/me', isAuth, getMyProfile);

// ROUTE            >     GET  /api/profiles/:id
// DESC             >     GET PROFILE BY ID
// ACCESS CONTROL   >     PUBLIC
router.get('/:id', getProfile);

// ROUTE            >     POST  /api/profiles/change
// DESC             >     CREATE PROFILE
// ACCESS CONTROL   >     PRIVATE
router.post(
  '/change',
  isAuth,
  [
    check('name', 'Please enter a valid name!')
      .not()
      .isEmpty(),
    check('location', 'Please enter location!')
      .not()
      .isEmpty(),
    check('status', 'Please enter status!')
      .not()
      .isEmpty(),
    check('age', 'Please enter age!')
      .not()
      .isEmpty(),
    check('profession', 'Please enter profession!')
      .not()
      .isEmpty()
  ],
  createOrUpdateProfile
);

// ROUTE            >     DELETE  /api/profiles/:id
// DESC             >     DELETE PROFILES
// ACCESS CONTROL   >     PRIVATE
router.delete('/:id', isAuth, deleteProfile);

export default router;
