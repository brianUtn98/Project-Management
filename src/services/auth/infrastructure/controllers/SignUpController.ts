import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import Controller from '../../../../utils/infrastructure/Controller';
import HashPasswordUseCase from '../../application/HashPasswordUseCase';
import UserRepository from '../../../users/infrastructure/repository/UserRepository';
import User from '../../../users/domain/User';
import UserCredentials from '../../../users/domain/UserCredentials';
import UserStatus from '../../../users/domain/UserStatus';

/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Register a new user
 *    tags: [Auth]
 *    parameters:
 *    requestBody:
 *      description: User data needed to create a new user
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          $ref: "#/components/schemas/SignupBody"
 *    description: Register a new user
 *    responses:
 *     200:
 *      description: Success
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              result:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: "#/components/schemas/User"
 *
 */
class SignUpController implements Controller {
  async exec(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction,
  ): Promise<any> {
    const { firstName, lastName, email, password } = req.body;

    try {
      const hashedPassword = await HashPasswordUseCase.execute(password);

      const user = (await UserRepository.create({
        firstName,
        lastName,
        email,
        status: UserStatus.ACTIVE,
      })) as User;

      await UserCredentials.create({
        email,
        password: hashedPassword,
        userId: user.id,
      });

      return res.status(201).json({ result: { user } });
    } catch (err) {
      next(err);
    }
  }
}

export default new SignUpController();
