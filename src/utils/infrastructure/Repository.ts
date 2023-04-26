import Entity, { IEntity } from '../domain/Entity';
import IRead from '../domain/contracts/IRead';
import IWrite from '../domain/contracts/IWrite';

export default abstract class Repository implements IRead, IWrite {
  protected entity: IEntity;

  constructor(entity: IEntity) {
    this.entity = entity;
  }

  public async create(values: any, options?: any) {
    return this.entity.create(values, options) as Promise<Entity>;
  }

  public async findAll(options?: any) {
    return this.entity.findAll(options);
  }

  public async findById(id: number, options?: any) {
    return this.entity.findByPk(id, options);
  }

  public async find(options: any) {
    return this.entity.findAll(options);
  }

  public async createMany(values: any, options?: any) {
    return this.entity.bulkCreate(values, options) as Promise<Entity[]>;
  }

  public async deleteById(id: number, options?: any) {
    options = options || {
      where: { id },
    };

    Object.assign(options, { where: { id } });

    return this.deleteByOptions(options);
  }

  public async deleteByOptions(options: any): Promise<number> {
    return this.entity.destroy(options);
  }

  public async updateByOptions(options: any, values: any) {
    return this.entity.update(values, options);
  }

  public async updateById(id: number, values: any, options?: any) {
    options = options || {
      where: { id },
    };

    Object.assign(options, { where: { id } });

    return this.updateByOptions(options, values);
  }

  public async count(options?: any) {
    return this.entity.count(options);
  }
}
