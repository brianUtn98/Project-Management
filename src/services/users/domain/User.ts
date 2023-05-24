import {
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Table,
} from 'sequelize-typescript';
import Entity from '../../../utils/domain/Entity';
import Role from './Role';
import UserRole from './UserRole';
import UserCredentials from './UserCredentials';
import UserStatus from './UserStatus';
import Project from '../../projects/domain/Project';
import UserProject from '../../projects/domain/UserProject';

@Table({
  freezeTableName: true,
})
class User extends Entity {
  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column(DataType.STRING)
  status!: UserStatus;

  @Column
  email!: string;

  @Column
  lastActivity!: Date;

  @BelongsToMany(() => Role, () => UserRole)
  roles!: Role[];

  @BelongsToMany(() => Project, () => UserProject)
  projects!: Project[];
}

export default User;
