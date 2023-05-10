import { Request, Response, NextFunction } from 'express';
import UserRepository from '../services/users/infrastructure/repository/UserRepository';
import User from '../services/users/domain/User';

const user = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return next();
  }

  try {
    const token = authorization!.split(' ')[1];

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

    const user = (
      await UserRepository.find({
        where: {
          email: payload.user.email,
        },
      })
    )[0] as User;

    await UserRepository.updateById(Number(user.id), {
      lastActivity: new Date(),
    });

    // const user = (await UserRepository.findById(Number(payload.user.id))) as User

    if (!user) {
      return next();
    }

    (request as any).user = user;

    return next();
  } catch (err) {
    return next(err);
  }
};

export default user;
