import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Partido, Torneo, TorneoRelations} from '../models';
import {PartidoRepository} from './partido.repository';

export class TorneoRepository extends DefaultCrudRepository<
  Torneo,
  typeof Torneo.prototype.id,
  TorneoRelations
> {
  public readonly partido: HasOneRepositoryFactory<
    Partido,
    typeof Torneo.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('PartidoRepository')
    getPartidoRepository: Getter<PartidoRepository>,
  ) {
    super(Torneo, dataSource);

    this.partido = this.createHasOneRepositoryFactoryFor(
      'partido',
      getPartidoRepository,
    );

    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
  }
}
