import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Torneo} from '../models';
import {TorneoRepository} from '../repositories';

export class TorneoController {
  constructor(
    @repository(TorneoRepository)
    public torneoRepository: TorneoRepository,
  ) {}

  @post('/torneos')
  @response(200, {
    description: 'Torneo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Torneo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torneo, {
            title: 'NewTorneo',
            exclude: ['id'],
          }),
        },
      },
    })
    torneo: Omit<Torneo, 'id'>,
  ): Promise<Torneo> {
    return this.torneoRepository.create(torneo);
  }

  @get('/torneos')
  @response(200, {
    description: 'Array of Torneo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Torneo, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Torneo) filter?: Filter<Torneo>): Promise<Torneo[]> {
    return this.torneoRepository.find(filter);
  }

  @get('/torneos/{id}')
  @response(200, {
    description: 'Torneo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Torneo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Torneo, {exclude: 'where'})
    filter?: FilterExcludingWhere<Torneo>,
  ): Promise<Torneo> {
    return this.torneoRepository.findById(id, filter);
  }
}
