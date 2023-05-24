import { NextFunction, Request, Response } from 'express';
import User from '../../../../users/domain/User';
import UserContextualValidation from '../../../../../utils/infrastructure/middlewares/permissions/UserContextualValidation';

class CanCreateProjectTask {
  async can(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = (req as any).user as User;

    try {
      await new UserContextualValidation(user).validateProjectId(id);

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default new CanCreateProjectTask();
