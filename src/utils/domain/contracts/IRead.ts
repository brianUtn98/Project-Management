import { Document } from 'mongoose';
import { GroupedCountResultItem } from 'sequelize';
import Entity from '../Entity';

export default interface IRead {
  findAll(options?: any): Promise<Entity[] | Document[]>;
  findById(
    id: number | string,
    options?: any,
  ): Promise<Entity | Document | null>;
  find(options: any): Promise<Entity[] | Document[]>;
  count(options: any): Promise<GroupedCountResultItem[] | number>;
}
