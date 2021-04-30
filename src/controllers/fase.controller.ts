import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Fase} from '../models';
import {FaseRepository} from '../repositories';

export class FaseController {
  constructor(
    @repository(FaseRepository)
    public faseRepository: FaseRepository,
  ) {}

  @post('/fases')
  @response(200, {
    description: 'Fase model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fase)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fase, {
            title: 'NewFase',
            exclude: ['id'],
          }),
        },
      },
    })
    fase: Omit<Fase, 'id'>,
  ): Promise<Fase> {
    return this.faseRepository.create(fase);
  }

  @get('/fases')
  @response(200, {
    description: 'Array of Fase model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fase, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Fase) filter?: Filter<Fase>): Promise<Fase[]> {
    return this.faseRepository.find(filter);
  }

  @get('/fases/{id}')
  @response(200, {
    description: 'Fase model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fase, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Fase, {exclude: 'where'}) filter?: FilterExcludingWhere<Fase>,
  ): Promise<Fase> {
    return this.faseRepository.findById(id, filter);
  }
}
