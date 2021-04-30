import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Torneo, TorneoWithRelations} from './torneo.model';

@model()
export class Partido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @belongsTo(() => Torneo)
  idTorneo?: number;

  @property({
    type: 'number',
  })
  idArbitro?: number;

  @property({
    type: 'number',
  })
  idSede?: number;

  @property({
    type: 'number',
  })
  idFase?: number;

  // @hasMany(() => Equipo, {
  //   through: {model: () => Alineacion, keyFrom: 'idPartido', keyTo: 'idEquipo'},
  // })
  // equipos: Equipo[];

  @property({
    type: 'number',
  })
  idEquipoLocal?: number;

  @property({
    type: 'number',
  })
  idEquipoVisitante?: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt?: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt?: string;

  constructor(data?: Partial<Partido>) {
    super(data);
  }
}

export interface PartidoRelations {
  torneo?: TorneoWithRelations;
}

export type PartidoWithRelations = Partido & PartidoRelations;
