import { Router } from 'express';
import authRouter from '../services/auth/infrastructure/routes';
import userRouter from '../services/users/infrastructure/routes';
import projectRouter from '../services/projects/infrastructure/routes';
import taskRouter from '../services/tasks/infrastructure/routes';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(projectRouter);
router.use(taskRouter);

export default router;
