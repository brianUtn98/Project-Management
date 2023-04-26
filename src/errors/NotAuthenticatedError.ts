import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

class NotAuthenticatedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default NotAuthenticatedError;
