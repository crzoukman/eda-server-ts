import { Router } from "express";
import user from './user.routes';
import auth from './auth.routes';
import task from './task.routes';

const router = Router();

router.get('/ping', (_, res) => res.sendStatus(200));

router.use(user);
router.use(auth);
router.use(task);

export default router;