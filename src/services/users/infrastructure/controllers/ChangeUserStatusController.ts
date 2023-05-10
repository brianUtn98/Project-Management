import { Request, Response, NextFunction } from 'express';
import Controller from '../../../../utils/infrastructure/Controller';
import UserStatus from '../../domain/UserStatus';
import UserRepository from '../repository/UserRepository';
import User from '../../domain/User';

class ChangeUserStatusController implements Controller {
  async exec(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;

    const user = (await UserRepository.findById(Number(id))) as User;

    await UserRepository.updateById(Number(id), {
      status: this.negateStatus(user.status),
    });

    const updatedUser = (await UserRepository.findById(Number(id))) as User;

    res.status(200).json({ result: { user: updatedUser } });
  }

  private negateStatus(status: UserStatus) {
    return status === UserStatus.ACTIVE
      ? UserStatus.INACTIVE
      : UserStatus.ACTIVE;
  }
}

export default new ChangeUserStatusController();

// async / await
