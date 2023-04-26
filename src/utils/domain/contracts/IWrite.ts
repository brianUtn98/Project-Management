import mongoose, { Document } from 'mongoose';
import Entity from '../Entity';

export default interface IWrite {
  create(values: any): Promise<Entity | Document>;
  deleteById(id: number | string): Promise<number | any>;
  deleteByOptions(options: any): Promise<number | any>;
  updateById(
    id: number | string,
    values: any,
  ): Promise<[affectedCount: number, affectedRows: Entity[]] | any>;
}
