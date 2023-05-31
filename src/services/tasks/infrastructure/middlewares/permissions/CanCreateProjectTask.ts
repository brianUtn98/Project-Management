import { NextFunction, Request, Response } from 'express';
import User from '../../../../users/domain/User';
import UserContextualValidation from '../../../../../utils/infrastructure/middlewares/permissions/UserContextualValidation';

class CanCreateProjectTask {
  async can(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = (req as any).user as User;

    const asignee = (req as any).asignee as User;
    try {
      await new UserContextualValidation(user).validateProjectId(id);
      await new UserContextualValidation(asignee).validateProjectId(id);
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default new CanCreateProjectTask();
