import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Partido, PartidoRelations} from '../models';

export class PartidoRepository extends DefaultCrudRepository<
  Partido,
  typeof Partido.prototype.id,
  PartidoRelations
> {
  constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
    super(Partido, dataSource);
  }
}
