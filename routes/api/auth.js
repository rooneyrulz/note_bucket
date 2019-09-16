import { Router } from 'express';

// IMPORT CONTROLLER
import { authenticateUser, getAuthUser } from '../../controllers/auth';

const router = Router({ strict: true });

router.post('/', authenticateUser);
router.get('/user', getAuthUser);

export default router;
