import { NextFunction, Request, Response, Router } from 'express';
import GetUserProfileController from '../controllers/GetUserProfileController';
const userRouter = Router();

userRouter.get(
  '/users/profile',
  (req: Request, res: Response, next: NextFunction) =>
    GetUserProfileController.exec(req, res, next),
);

export default userRouter;
