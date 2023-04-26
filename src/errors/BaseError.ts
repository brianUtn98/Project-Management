import { StatusCodes } from "http-status-codes";

class BaseError extends Error {
  public readonly httpCode: StatusCodes;

  constructor(message: string, httpCode: StatusCodes) {
    super(message);

    // Object.setPrototypeOf(this,new.target.prototype);

    this.httpCode = httpCode;
  }

  public isOperational(): boolean {
    return this.httpCode < 500;
  }

  public errorMessage(): string {
    return `- ${this.message} - \n ${this.stack}`;
  }
}

export default BaseError;
