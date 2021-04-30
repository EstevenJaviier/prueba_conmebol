import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Grupo} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository: GrupoRepository,
  ) {}

  @post('/grupos')
  @response(200, {
    description: 'Grupo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupo',
            exclude: ['id'],
          }),
        },
      },
    })
    grupo: Omit<Grupo, 'id'>,
  ): Promise<Grupo> {
    return this.grupoRepository.create(grupo);
  }

  @get('/grupos')
  @response(200, {
    description: 'Array of Grupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Grupo, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Grupo) filter?: Filter<Grupo>): Promise<Grupo[]> {
    return this.grupoRepository.find(filter);
  }

  @get('/grupos/{id}')
  @response(200, {
    description: 'Grupo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Grupo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Grupo, {exclude: 'where'})
    filter?: FilterExcludingWhere<Grupo>,
  ): Promise<Grupo> {
    return this.grupoRepository.findById(id, filter);
  }
}
