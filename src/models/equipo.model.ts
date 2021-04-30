import {Entity, hasMany, model, property} from '@loopback/repository';
import {Jugador} from './jugador.model';

@model()
export class Equipo extends Entity {
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
  seleccion: string;

  @property({
    type: 'string',
    required: true,
  })
  entrenador: string;

  @property({
    type: 'number',
    required: true,
  })
  numPts: number;

  @property({
    type: 'number',
    required: true,
  })
  numPj: number;

  @property({
    type: 'number',
    required: true,
  })
  numPg: number;

  @property({
    type: 'number',
    required: true,
  })
  numPe: number;

  @property({
    type: 'number',
    required: true,
  })
  numPp: number;

  @property({
    type: 'number',
    required: true,
  })
  numGf: number;

  @property({
    type: 'number',
    required: true,
  })
  numGc: number;

  @property({
    type: 'number',
    required: true,
  })
  numDif: number;

  @hasMany(() => Jugador, {keyTo: 'idEquipo'})
  jugadores: Jugador[];

  @property({
    type: 'number',
  })
  idGrupo?: number;

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

  constructor(data?: Partial<Equipo>) {
    super(data);
  }
}

export interface EquipoRelations {
  // describe navigational properties here
}

export type EquipoWithRelations = Equipo & EquipoRelations;
