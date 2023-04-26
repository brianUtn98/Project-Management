import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;
