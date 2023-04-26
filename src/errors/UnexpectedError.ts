import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

class UnexpectedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default UnexpectedError;
