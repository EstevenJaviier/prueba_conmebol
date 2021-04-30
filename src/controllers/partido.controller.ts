import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Partido} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoController {
  constructor(
    @repository(PartidoRepository)
    public partidoRepository: PartidoRepository,
  ) {}

  @post('/partidos')
  @response(200, {
    description: 'Partido model instance',
    content: {'application/json': {schema: getModelSchemaRef(Partido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {
            title: 'NewPartido',
            exclude: ['id'],
          }),
        },
      },
    })
    partido: Omit<Partido, 'id'>,
  ): Promise<Partido> {
    return this.partidoRepository.create(partido);
  }

  @get('/partidos')
  @response(200, {
    description: 'Array of Partido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Partido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Partido) filter?: Filter<Partido>,
  ): Promise<Partido[]> {
    return this.partidoRepository.find(filter);
  }

  @get('/partidos/{id}')
  @response(200, {
    description: 'Partido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Partido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Partido, {exclude: 'where'})
    filter?: FilterExcludingWhere<Partido>,
  ): Promise<Partido> {
    return this.partidoRepository.findById(id, filter);
  }
}
