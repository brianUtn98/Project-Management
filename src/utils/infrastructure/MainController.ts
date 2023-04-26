import { Request, Response, NextFunction } from 'express';
import Repository from './Repository';

class MainController {
  private repository: Repository;
  private options: any;

  constructor(repository: Repository, options?: any) {
    this.repository = repository;
    this.options = options;
  }

  public async find(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const result = await this.repository.find(this.options);

      return response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async findById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    const {
      params: { id },
    } = request;

    try {
      const result = await this.repository.findById(Number(id), this.options);
      if (!result) {
        return response.status(404).json({ message: `Not found.` });
      }
      return response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async findAll(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const result = await this.repository.findAll(this.options);

      return response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async count(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await this.repository.count();
      return response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public addOption(option: any): void {
    Object.assign(this.options, option);
  }
}

export default MainController;
