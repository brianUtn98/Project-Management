import { NextFunction, Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import SignUpController from '../controllers/SignUpController';

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response, next: NextFunction) =>
  LoginController.exec(req, res, next),
);

authRouter.post('/signup', (req: Request, res: Response, next: NextFunction) =>
  SignUpController.exec(req, res, next),
);

export default authRouter;
