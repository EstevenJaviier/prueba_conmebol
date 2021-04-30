import {Entity, model, property} from '@loopback/repository';

@model()
export class Fase extends Entity {
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
    type: 'number',
    required: true,
  })
  numPartidos: number;

  @property({
    type: 'number',
    required: true,
  })
  numPj: number;

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

  constructor(data?: Partial<Fase>) {
    super(data);
  }
}

export interface FaseRelations {
  // describe navigational properties here
}

export type FaseWithRelations = Fase & FaseRelations;
