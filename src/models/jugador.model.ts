import {Entity, model, property} from '@loopback/repository';

@model()
export class Jugador extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  sobrenombre: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreCamisa: string;

  @property({
    type: 'string',
    required: true,
  })
  numCamisa: string;

  @property({
    type: 'string',
    required: true,
  })
  numPasaporte: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVencPasaporte: string;

  @property({
    type: 'number',
    required: true,
  })
  posicion: number;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'number',
    required: true,
  })
  altura: number;

  @property({
    type: 'string',
    required: true,
  })
  pais: string;

  @property({
    type: 'string',
    required: true,
  })
  club: string;

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

  constructor(data?: Partial<Jugador>) {
    super(data);
  }
}

export interface JugadorRelations {
  // describe navigational properties here
}

export type JugadorWithRelations = Jugador & JugadorRelations;
