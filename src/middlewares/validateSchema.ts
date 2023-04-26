import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import BadRequestError from '../errors/BadRequestError';

const validateSchema = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const error =
      errors
        .array()
        .map((err) => err.msg)
        .join(', ') + '.';
    return next(new BadRequestError(error));
  }
  return next();
};

export default validateSchema;
