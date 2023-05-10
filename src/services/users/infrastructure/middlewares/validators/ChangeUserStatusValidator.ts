import { CustomValidator, ValidationChain, param } from 'express-validator';
import Validator from '../../../../../utils/infrastructure/Validator';
import UserRepository from '../../repository/UserRepository';

class ChangeUserStatusValidator implements Validator {
  validation(): ValidationChain[] {
    return [
      param('id')
        .notEmpty()
        .withMessage('Id is required')
        .bail()
        .isNumeric()
        .withMessage('Id must be a number')
        .bail()
        .custom(this.isValidUserId)
        .withMessage("User doesn't exist"),
    ];
  }

  private isValidUserId: CustomValidator = async (id: string) => {
    const user = await UserRepository.findById(Number(id));

    if (!user) {
      return await Promise.reject();
    }

    return await Promise.resolve();
  };
}

export default new ChangeUserStatusValidator();
