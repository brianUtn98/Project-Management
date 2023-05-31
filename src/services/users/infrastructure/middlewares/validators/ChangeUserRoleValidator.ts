import {
  CustomValidator,
  ValidationChain,
  body,
  param,
} from 'express-validator';
import Validator from '../../../../../utils/infrastructure/Validator';
import UserRepository from '../../repository/UserRepository';
import User from '../../../domain/User';
import UserRole from '../../../domain/UserRole';

class ChangeUserRoleValidator implements Validator {
  validation(): ValidationChain[] {
    return [
      param('id')
        .isNumeric()
        .withMessage('Id must be a number')
        .bail()
        .custom(this.isValidUserId),
      body('roleId')
        .isNumeric()
        .withMessage('Role id must be a number')
        .bail()
        .custom(this.isValidRoleId),
    ];
  }

  private isValidUserId: CustomValidator = async (value) => {
    const user = (await UserRepository.findById(Number(value))) as User;

    if (!user) {
      return await Promise.reject('User not found');
    }

    return await Promise.resolve();
  };

  private isValidRoleId: CustomValidator = async (value) => {
    const role = await UserRole.findByPk(Number(value));

    if (!role) {
      return await Promise.reject('Role not found');
    }

    return await Promise.resolve();
  };
}

export default new ChangeUserRoleValidator();
