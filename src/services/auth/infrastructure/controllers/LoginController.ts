import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import Controller from '../../../../utils/infrastructure/Controller';
import UserRepository from '../../../users/infrastructure/repository/UserRepository';
import User from '../../../users/domain/User';
import UserCredentials from '../../../users/domain/UserCredentials';
import IsCorrectPasswordUseCase from '../../application/IsCorrectPasswordUseCase';
import { StatusCodes } from 'http-status-codes';
import GenerateTokenUseCase from '../../application/GenerateTokenUseCase';
import NotAuthenticatedError from '../../../../errors/NotAuthenticatedError';

class LoginController implements Controller {
  async exec(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { email, password } = req.body;

      const user = (
        await UserRepository.find({
          where: {
            email,
          },
        })
      )[0] as User;

      const credentials = (
        await UserCredentials.findAll({
          where: {
            userId: user.id,
          },
        })
      )[0];

      const isCorrect = await IsCorrectPasswordUseCase.execute(
        password,
        credentials.password,
      );

      if (!isCorrect) {
        throw new NotAuthenticatedError('Incorrect password');
      }

      const token = GenerateTokenUseCase.execute(user);

      return res.status(StatusCodes.OK).json({ result: { token } });
    } catch (err) {
      next(err);
      return;
    }
  }
}

export default new LoginController();
