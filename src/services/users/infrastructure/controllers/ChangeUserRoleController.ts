import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import Controller from '../../../../utils/infrastructure/Controller';
import User from '../../domain/User';
import UserRole from '../../domain/UserRole';
import UserRepository from '../repository/UserRepository';
import Role from '../../domain/Role';

class ChangeUserRoleController implements Controller {
  async exec(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;
    const { roleId } = req.body;

    try {
      const user = (await User.findByPk(Number(id), {
        include: {
          association: 'roles',
          model: Role,
          through: {
            attributes: [],
          },
        },
      })) as User;

      const userRoles = user.roles.map((userRole) => userRole.id).map(Number);

      if (userRoles.includes(roleId)) {
        return res.status(200).json({
          result: {
            user,
          },
        });
      }

      await user.$add('roles', [roleId]);

      const updatedUser = await UserRepository.findById(Number(id), {
        include: {
          association: 'roles',
          model: Role,
        },
      });

      return res.status(200).json({ result: { user: updatedUser } });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default new ChangeUserRoleController();
