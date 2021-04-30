import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Arbitro} from '../models';
import {ArbitroRepository} from '../repositories';

export class ArbitroController {
  constructor(
    @repository(ArbitroRepository)
    public arbitroRepository: ArbitroRepository,
  ) {}

  @post('/arbitros')
  @response(200, {
    description: 'Arbitro model instance',
    content: {'application/json': {schema: getModelSchemaRef(Arbitro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Arbitro, {
            title: 'NewArbitro',
            exclude: ['id'],
          }),
        },
      },
    })
    arbitro: Omit<Arbitro, 'id'>,
  ): Promise<Arbitro> {
    return this.arbitroRepository.create(arbitro);
  }

  @get('/arbitros')
  @response(200, {
    description: 'Array of Arbitro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Arbitro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Arbitro) filter?: Filter<Arbitro>,
  ): Promise<Arbitro[]> {
    return this.arbitroRepository.find(filter);
  }

  @get('/arbitros/{id}')
  @response(200, {
    description: 'Arbitro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Arbitro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Arbitro, {exclude: 'where'})
    filter?: FilterExcludingWhere<Arbitro>,
  ): Promise<Arbitro> {
    return this.arbitroRepository.findById(id, filter);
  }
}
