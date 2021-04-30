import {Entity, model, property} from '@loopback/repository';

@model()
export class Alineacion extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  numDefensas: number;

  @property({
    type: 'number',
    required: true,
  })
  numCentrales: number;

  @property({
    type: 'number',
    required: true,
  })
  numDelanteros: number;

  @property({
    type: 'number',
  })
  idPartido?: number;

  @property({
    type: 'number',
  })
  idEquipo?: number;

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

  constructor(data?: Partial<Alineacion>) {
    super(data);
  }
}

export interface AlineacionRelations {
  // describe navigational properties here
}

export type AlineacionWithRelations = Alineacion & AlineacionRelations;
