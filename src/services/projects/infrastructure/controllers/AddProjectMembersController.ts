import { Request, Response, NextFunction } from 'express';
import Controller from '../../../../utils/infrastructure/Controller';
import ProjectRepository from '../repository/ProjectRepository';
import Project from '../../domain/Project';
import UserProject from '../../domain/UserProject';
import User from '../../../users/domain/User';

class AddProjectMembersController implements Controller {
  async exec(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    const { users } = req.body as { users: number[] };

    try {
      const projectToAdMembers = (await ProjectRepository.findById(
        Number(id),
      )) as Project;

      await projectToAdMembers.$add('members', users); // TODO: Revisar

      const project = (await ProjectRepository.findById(Number(id), {
        include: [User],
      })) as Project;

      return res.status(201).json({ result: { project } });
    } catch (err) {
      next(err);
    }
  }
}

export default new AddProjectMembersController();
