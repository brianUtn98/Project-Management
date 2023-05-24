import { ValidationChain, body } from 'express-validator';
import Validator from '../../../../../utils/infrastructure/Validator';

class CreateProjectValidator implements Validator {
  validation(): ValidationChain[] {
    return [
      body('name')
        .notEmpty()
        .withMessage('Name is required')
        .bail()
        .isString()
        .withMessage('Name must be a string'),
      body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
      body('path')
        .notEmpty()
        .withMessage('Path is required')
        .isURL()
        .withMessage('Path must be a URL'),
      body('dueDate')
        .optional()
        .isString()
        .withMessage('Due date must be a string'),
    ];
  }
}

export default new CreateProjectValidator();
