import { Sequelize } from 'sequelize-typescript';
import { dbClient } from '.';
import Project from '../services/projects/domain/Project';
import UserProject from '../services/projects/domain/UserProject';
import Task from '../services/tasks/domain/Task';
import Role from '../services/users/domain/Role';
import User from '../services/users/domain/User';
import UserRole from '../services/users/domain/UserRole';
import UserCredentials from '../services/users/domain/UserCredentials';

class DBClient {
  private client: Sequelize;
  constructor(url: string) {
    this.client = new Sequelize(url, {
      dialect: 'postgres',
    });
  }

  public getClient(): Sequelize {
    return this.client;
  }

  public async init(): Promise<void> {
    await this.client.authenticate();

    this.client.addModels([
      Project,
      UserProject,
      Task,
      Role,
      User,
      UserRole,
      UserCredentials,
    ]);

    await this.client.sync();
  }
}

export default DBClient;
