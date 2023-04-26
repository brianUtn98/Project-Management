import { Router } from 'express';
import authRouter from '../services/auth/infrastructure/routes';
import userRouter from '../services/users/infrastructure/routes';

const router = Router();

router.use(authRouter);
router.use(userRouter);

export default router;
