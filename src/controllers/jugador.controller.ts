import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Jugador} from '../models';
import {JugadorRepository} from '../repositories';

export class JugadorController {
  constructor(
    @repository(JugadorRepository)
    public jugadorRepository: JugadorRepository,
  ) {}

  @post('/jugadores')
  @response(200, {
    description: 'Jugador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jugador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {
            title: 'NewJugador',
            exclude: ['id'],
          }),
        },
      },
    })
    jugador: Omit<Jugador, 'id'>,
  ): Promise<Jugador> {
    return this.jugadorRepository.create(jugador);
  }

  @get('/jugadores')
  @response(200, {
    description: 'Array of Jugador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jugador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jugador) filter?: Filter<Jugador>,
  ): Promise<Jugador[]> {
    return this.jugadorRepository.find(filter);
  }

  @get('/jugadores/{id}')
  @response(200, {
    description: 'Jugador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jugador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Jugador, {exclude: 'where'})
    filter?: FilterExcludingWhere<Jugador>,
  ): Promise<Jugador> {
    return this.jugadorRepository.findById(id, filter);
  }

  @patch('/jugadores/{id}/camisa')
  @response(204, {
    description: 'Camisa PATCH success',
  })
  async updateCamisaById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              numCamisa: {
                type: 'string',
              },
              posicion: {
                type: 'number',
              },
            },
          },
        },
      },
    })
    jugador: Jugador,
  ): Promise<void> {
    await this.jugadorRepository.updateById(id, {
      numCamisa: jugador.numCamisa,
      posicion: jugador.posicion,
    });
  }

  @get('/jugadores/paises/{nombrePais}')
  @response(200, {
    description: 'Array of Jugador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jugador, {includeRelations: true}),
        },
      },
    },
  })
  async findByNombrePais(
    @param.path.string('nombrePais') nombrePais: string,
  ): Promise<Jugador[]> {
    return this.jugadorRepository.find({
      where: {pais: nombrePais},
      fields: ['apellidos', 'numCamisa', 'posicion'],
    });
  }
}
