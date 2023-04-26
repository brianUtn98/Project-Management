import BaseError from './BaseError';
import { StatusCodes } from "http-status-codes"

class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequestError;
