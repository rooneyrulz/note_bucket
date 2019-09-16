import { Router } from 'express';

// IMPORT CONTROLLER
import testController from '../../controllers/test';

const router = Router({ strict: true });

router.get('/', testController);

export default router;
