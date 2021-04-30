import {Entity, hasOne, model, property} from '@loopback/repository';
import {Partido} from './partido.model';

@model()
export class Sede extends Entity {
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
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  pais: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidad: number;

  @property({
    type: 'string',
    required: true,
  })
  estadio: string;

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

  @hasOne(() => Partido, {keyTo: 'idSede'})
  partido: Partido;

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
