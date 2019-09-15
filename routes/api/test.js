import { Router } from 'express';

const router = Router({ strict: true });

router.get('/test', (req, res, next) => res.status(200).send('Yes, Awesome!'));

export default router;
