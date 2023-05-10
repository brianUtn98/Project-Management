import { NextFunction, Request, Response, Router } from 'express';
import GetUserProfileController from '../controllers/GetUserProfileController';
import ChangeUserStatusController from '../controllers/ChangeUserStatusController';
import ChangeUserStatusValidator from '../middlewares/validators/ChangeUserStatusValidator';
import validateSchema from '../../../../middlewares/validateSchema';
import UserCanValidator from '../../../auth/infrastructure/middlewares/validators/UserCanValidator';
const userRouter = Router();

userRouter.get(
  '/users/profile',
  (req: Request, res: Response, next: NextFunction) =>
    GetUserProfileController.exec(req, res, next),
);

// Id para identificar al usuario
// El usuario existe ?
// El usuario logueado tiene permisos ?
userRouter.patch(
  '/users/:id/status',
  ChangeUserStatusValidator.validation(),
  UserCanValidator.validation(['Admin']),
  validateSchema,
  (req: Request, res: Response, next: NextFunction) =>
    ChangeUserStatusController.exec(req, res, next),
);

export default userRouter;
