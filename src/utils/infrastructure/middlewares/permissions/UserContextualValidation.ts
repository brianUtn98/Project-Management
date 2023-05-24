import ForbiddenError from '../../../../errors/ForbiddenError';
import Project from '../../../../services/projects/domain/Project';
import ProjectRepository from '../../../../services/projects/infrastructure/repository/ProjectRepository';
import User from '../../../../services/users/domain/User';

class UserContextualValidation {
  readonly user: User;

  constructor(user: User) {
    this.user = user;
  }

  public validateUserId(userId: number | string): UserContextualValidation {
    if (Number(userId) !== Number(this.user.id)) {
      throw new ForbiddenError("You don't have permission to do this action");
    }

    return this;
  }

  public async validateProjectId(
    projectId: number | string,
  ): Promise<UserContextualValidation> {
    const project = (await ProjectRepository.findById(Number(projectId), {
      include: [User],
    })) as Project;

    const userIds = project.members.map((user) => user.id);

    if (!userIds.includes(this.user.id)) {
      console.log(userIds);

      console.log(this.user.id);

      throw new ForbiddenError("You don't have permission to do this action");
    }

    return this;
  }
}

export default UserContextualValidation;
