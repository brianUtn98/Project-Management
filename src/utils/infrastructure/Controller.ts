import { NextFunction, Request, Response } from 'express';

export default interface Controller {
  exec(req: Request, res: Response, next: NextFunction): Promise<any>;
}
