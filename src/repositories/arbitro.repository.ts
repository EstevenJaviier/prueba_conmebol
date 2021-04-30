import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Arbitro, ArbitroRelations} from '../models';

export class ArbitroRepository extends DefaultCrudRepository<
  Arbitro,
  typeof Arbitro.prototype.id,
  ArbitroRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Arbitro, dataSource);
  }
}
