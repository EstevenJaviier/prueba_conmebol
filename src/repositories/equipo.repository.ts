import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Equipo, EquipoRelations, Jugador} from '../models';
import {JugadorRepository} from './jugador.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.id,
  EquipoRelations
> {
  public readonly jugadores: HasManyRepositoryFactory<
    Jugador,
    typeof Equipo.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('JugadorRepository')
    protected jugadorRepositoryGetter: Getter<JugadorRepository>,
  ) {
    super(Equipo, dataSource);

    this.jugadores = this.createHasManyRepositoryFactoryFor(
      'jugadores',
      jugadorRepositoryGetter,
    );
    this.registerInclusionResolver(
      'jugadores',
      this.jugadores.inclusionResolver,
    );
  }
}
