import { Request, Response, NextFunction } from 'express';
import Controller from '../../../../utils/infrastructure/Controller';
import TaskRepository from '../repository/TaskRepository';
import Task from '../../domain/Task';
import User from '../../../users/domain/User';

class CreateProjectTaskController implements Controller {
  async exec(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    const { title, description, asigneeId, dueDate } = req.body;

    const user = (req as any).user as User;

    try {
      const task = (await TaskRepository.create({
        title,
        description,
        authorId: user.id,
        asigneeId,
        dueDate,
        projectId: id,
      })) as Task;

      return res.status(201).json({ result: { task } });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default new CreateProjectTaskController();
