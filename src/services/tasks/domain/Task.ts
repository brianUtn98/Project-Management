import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import Entity from '../../../utils/domain/Entity';
import TaskStatus from './TaskStatus';
import User from '../../users/domain/User';
import Project from '../../projects/domain/Project';

@Table({
  freezeTableName: true,
})
class Task extends Entity {
  @Column
  title!: string;

  @Column
  description!: string;

  @Column(DataType.STRING)
  status!: TaskStatus;

  @BelongsTo(() => User)
  author!: User;

  @ForeignKey(() => User)
  @Column
  authorId!: number;

  @ForeignKey(() => User)
  @Column
  asigneeId!: number;

  @BelongsTo(() => Project)
  project!: Project;

  @ForeignKey(() => Project)
  @Column
  projectId!: number;

  @BelongsTo(() => User)
  asignee!: User;

  @Column
  createdAt!: Date;

  @Column
  dueDate!: Date;

  @Column
  finishedAt!: Date;
}

export default Task;
