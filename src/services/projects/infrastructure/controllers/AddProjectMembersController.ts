import { Request, Response, NextFunction } from 'express';
import Controller from '../../../../utils/infrastructure/Controller';
import ProjectRepository from '../repository/ProjectRepository';
import Project from '../../domain/Project';
import User from '../../../users/domain/User';

class AddProjectMembersController implements Controller {
  async exec(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    const { users } = req.body as { users: number[] };

    try {
      const projectToAdMembers = (await Project.findByPk(Number(id), {
        include: {
          association: 'members',
          attributes: ['id'],
          model: User,
        },
      })) as Project;

      const previousMembers = projectToAdMembers.members
        .map((member) => member.id)
        .map(Number);

      const membersToAdd = users.filter(
        (user) => !previousMembers.includes(user),
      );

      await projectToAdMembers.$add('members', membersToAdd, {});

      const project = (await ProjectRepository.findById(Number(id), {
        include: [User],
      })) as Project;

      return res.status(201).json({ result: { project } });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default new AddProjectMembersController();
