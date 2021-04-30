import {Entity, hasOne, model, property} from '@loopback/repository';
import {Partido} from './partido.model';

@model()
export class Torneo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFin: string;

  @property({
    type: 'number',
    required: true,
  })
  edicion: number;

  @property({
    type: 'string',
    required: true,
  })
  organizador: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;

  @hasOne(() => Partido, {keyTo: 'idTorneo'})
  partido?: Partido;

  constructor(data?: Partial<Torneo>) {
    super(data);
  }
}

export interface TorneoRelations {
  // describe navigational properties here
}

export type TorneoWithRelations = Torneo & TorneoRelations;
