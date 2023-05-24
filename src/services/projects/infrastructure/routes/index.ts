import { NextFunction, Request, Response, Router } from 'express';
import CreateProjectController from '../controllers/CreateProjectController';
import UserCanValidator from '../../../auth/infrastructure/middlewares/validators/UserCanValidator';
import validateSchema from '../../../../middlewares/validateSchema';
import CreateProjectValidator from '../middlewares/validators/CreateProjectValidator';
import AddProjectMembersController from '../controllers/AddProjectMembersController';

const projectRouter = Router();

projectRouter.post(
  '/projects',
  CreateProjectValidator.validation(),
  UserCanValidator.validation(['Admin', 'Project Owner']),
  validateSchema,
  (req: Request, res: Response, next: NextFunction) =>
    CreateProjectController.exec(req, res, next),
);

projectRouter.post(
  '/projects/:id/users',
  UserCanValidator.validation(['Admin', 'Project Owner']),
  validateSchema,
  (req: Request, res: Response, next: NextFunction) =>
    AddProjectMembersController.exec(req, res, next),
);

export default projectRouter;
