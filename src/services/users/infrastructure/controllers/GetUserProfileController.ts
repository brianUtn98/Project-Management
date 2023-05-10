import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import Controller from '../../../../utils/infrastructure/Controller';
import User from '../../domain/User';
import { StatusCodes } from 'http-status-codes';

class GetUserProfileController implements Controller {
  async exec(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction,
  ): Promise<any> {
    const user = (req as any).user as User;

    return res.status(StatusCodes.OK).json({ result: { user } });
  }
}

export default new GetUserProfileController();
