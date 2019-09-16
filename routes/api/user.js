import { Router } from 'express';

// IMPORT CONTROLLER
import { getUsers, getUser, addUser, deleteUser } from '../../controllers/user';

const router = Router({ strict: true });

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/add', addUser);
router.delete('/:id', deleteUser);

export default router;
