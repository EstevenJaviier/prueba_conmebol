import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Sede} from '../models';
import {SedeRepository} from '../repositories';

export class SedeController {
  constructor(
    @repository(SedeRepository)
    public sedeRepository: SedeRepository,
  ) {}

  @post('/sedes')
  @response(200, {
    description: 'Sede model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sede)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {
            title: 'NewSede',
            exclude: ['id'],
          }),
        },
      },
    })
    sede: Omit<Sede, 'id'>,
  ): Promise<Sede> {
    return this.sedeRepository.create(sede);
  }

  @get('/sedes')
  @response(200, {
    description: 'Array of Sede model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sede, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Sede) filter?: Filter<Sede>): Promise<Sede[]> {
    return this.sedeRepository.find(filter);
  }

  @get('/sedes/{id}')
  @response(200, {
    description: 'Sede model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sede, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sede, {exclude: 'where'}) filter?: FilterExcludingWhere<Sede>,
  ): Promise<Sede> {
    return this.sedeRepository.findById(id, filter);
  }
}
