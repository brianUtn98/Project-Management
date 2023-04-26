import { Request, Response, NextFunction } from 'express';
import { ValidationChain } from 'express-validator';

export default interface Validator {
  validation(): ValidationChain[];
}
