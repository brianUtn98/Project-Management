import { NextFunction, Request, Response } from 'express';
import BaseError from '../errors/BaseError';
import InternalServerError from '../errors/InternalServerError';
import Logger from '../logger/Logger';

const onError = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  Error.captureStackTrace(err);
  if (err instanceof BaseError) {
    if (err.isOperational()) {
      response.status(err.httpCode).json({ message: err.message });
      next();
      return;
    }
  }

  const error = new InternalServerError(err.message);

  response.status(error.httpCode).json({ message: error.message });

  Logger.error(error.errorMessage());

  next();
  return;
};

export default onError;
