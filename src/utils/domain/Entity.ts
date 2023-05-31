import {
  Column,
  Model,
  DataType,
  Table,
  DeletedAt,
} from 'sequelize-typescript';

@Table({
  freezeTableName: true,
})
export default class Entity extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataType.BIGINT,
  })
  declare id: number;
}

type IEntity = typeof Entity;

export { IEntity };
