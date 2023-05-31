import { NextFunction, Request, Response, Router } from 'express';
import GetUserProfileController from '../controllers/GetUserProfileController';
import ChangeUserStatusController from '../controllers/ChangeUserStatusController';
import ChangeUserStatusValidator from '../middlewares/validators/ChangeUserStatusValidator';
import validateSchema from '../../../../middlewares/validateSchema';
import UserCanValidator from '../../../auth/infrastructure/middlewares/validators/UserCanValidator';
import ChangeUserRoleController from '../controllers/ChangeUserRoleController';
import ChangeUserRoleValidator from '../middlewares/validators/ChangeUserRoleValidator';
const userRouter = Router();

userRouter.get(
  '/users/profile',
  (req: Request, res: Response, next: NextFunction) =>
    GetUserProfileController.exec(req, res, next),
);

userRouter.patch(
  '/users/:id/status',
  ChangeUserStatusValidator.validation(),
  UserCanValidator.validation(['Admin']),
  validateSchema,
  (req: Request, res: Response, next: NextFunction) =>
    ChangeUserStatusController.exec(req, res, next),
);

userRouter.post(
  '/users/:id/roles',
  ChangeUserRoleValidator.validation(),
  UserCanValidator.validation(['Admin']),
  validateSchema,
  (req: Request, res: Response, next: NextFunction) =>
    ChangeUserRoleController.exec(req, res, next),
);

export default userRouter;
