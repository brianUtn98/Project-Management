import { Request, Response, NextFunction } from 'express';
import Controller from '../../../../utils/infrastructure/Controller';
import ProjectRepository from '../repository/ProjectRepository';
import Project from '../../domain/Project';
import UserProject from '../../domain/UserProject';
import User from '../../../users/domain/User';

class CreateProjectController implements Controller {
  async exec(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { name, description, path, dueDate } = req.body;

    try {
      const user = (req as any).user as User;

      const project = (await ProjectRepository.create({
        name,
        description,
        path,
        dueDate,
        createdAt: new Date(),
      })) as Project;

      project.$add('members', [user.id]);

      return res.status(201).json({ result: { project } });
    } catch (err) {
      next(err);
    }
  }
}

export default new CreateProjectController();
