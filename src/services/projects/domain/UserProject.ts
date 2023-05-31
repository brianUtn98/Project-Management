import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import Entity from '../../../utils/domain/Entity';
import User from '../../users/domain/User';
import Project from './Project';

@Table({
  freezeTableName: true,
})
class UserProject extends Entity {
  @ForeignKey(() => User)
  @Column({ primaryKey: false })
  userId!: number;

  @ForeignKey(() => Project)
  @Column({ primaryKey: false })
  projectId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Project)
  project!: Project;
}

export default UserProject;
