import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Fase, FaseRelations} from '../models';

export class FaseRepository extends DefaultCrudRepository<
  Fase,
  typeof Fase.prototype.id,
  FaseRelations
> {
  constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
    super(Fase, dataSource);
  }
}
