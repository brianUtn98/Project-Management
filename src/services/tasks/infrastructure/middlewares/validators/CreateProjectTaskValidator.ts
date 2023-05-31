import { CustomValidator, ValidationChain, body } from 'express-validator';
import Validator from '../../../../../utils/infrastructure/Validator';
import UserRepository from '../../../../users/infrastructure/repository/UserRepository';
import User from '../../../../users/domain/User';

class CreateProjectTaskValidator implements Validator {
  validation(): ValidationChain[] {
    return [
      body('title')
        .notEmpty()
        .withMessage('Title is required')
        .bail()
        .withMessage('Title must be a string'),
      body('description')
        .optional()
        .bail()
        .isString()
        .withMessage('Description must be a string'),
      body('asigneeId')
        .isNumeric()
        .withMessage('AsigneeId must be a number')
        .bail()
        .custom(this.isValidAsigneeId),
    ];
  }

  private isValidAsigneeId: CustomValidator = async (value, { req }) => {
    const asignee = (await UserRepository.findById(Number(value))) as User;

    if (!asignee) {
      return await Promise.reject('Asignee not found');
    }

    (req as any).asignee = asignee;

    return await Promise.resolve();
  };
}

export default new CreateProjectTaskValidator();
