import { NextFunction, Request, Response, Router } from 'express';
import CreateProjectTaskController from '../controllers/CreateProjectTaskController';
import UserCanValidator from '../../../auth/infrastructure/middlewares/validators/UserCanValidator';
import validateSchema from '../../../../middlewares/validateSchema';
import CanCreateProjectTask from '../middlewares/permissions/CanCreateProjectTask';

const taskRouter = Router();

taskRouter.post(
  '/projects/:id/tasks',
  // TODO Validator
  UserCanValidator.validation(['Admin', 'Project Owner', 'ProjectMember']),
  CanCreateProjectTask.can,
  validateSchema,
  (req: Request, res: Response, next: NextFunction) =>
    CreateProjectTaskController.exec(req, res, next),
);

export default taskRouter;
