import { NextFunction, Request, Response } from 'express';
import NotAuthenticatedError from '../errors/NotAuthenticatedError';
import User from '../services/users/domain/User';

const auth = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const excluded = ['/login', '/docs'];

  if (!excluded.every((route) => !request.path.includes(route))) {
    next();
    return;
  }

  const { authorization } = request.headers;

  try {
    if (!authorization) {
      throw new NotAuthenticatedError('No authorization header');
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new NotAuthenticatedError('No token provided');
    }

    if (token.split('.').length !== 3) {
      throw new NotAuthenticatedError('Invalid token');
    }

    const [header, payload, signature] = token
      .split('.')
      .map((part) => Buffer.from(part, 'base64').toString('utf8'))
      .map((part, index) => {
        if (index !== 2) {
          return JSON.parse(part);
        } else {
          return part;
        }
      });

    const exp = new Date(payload.exp * 1000);

    if (exp < new Date()) {
      throw new NotAuthenticatedError('Token expired');
    }

    next();
  } catch (err) {
    next(err);
    return;
  }
};

export default auth;
