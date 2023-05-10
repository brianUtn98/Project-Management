import { NextFunction, Request, Response } from 'express';
import UserRole from '../../../../users/domain/UserRole';
import User from '../../../../users/domain/User';
import Role from '../../../../users/domain/Role';
import ForbiddenError from '../../../../../errors/ForbiddenError';

class UserCanValidator {
  public validation =
    (permissions: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user as User;

      const roles = (
        await UserRole.findAll({
          where: {
            userId: user.id,
          },
          include: [Role],
        })
      ).map((userRole) => userRole.role);

      const hasRole = (roles: Role[], permissions: string[]) => {
        return roles.some((role) => permissions.includes(role.name));
      };

      if (!hasRole(roles, permissions)) {
        next(
          new ForbiddenError("User doesn't have permissions to do that action"),
        );
      }

      next();
    };
}

export default new UserCanValidator();
