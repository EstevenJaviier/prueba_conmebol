import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Equipo} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoController {
  constructor(
    @repository(EquipoRepository)
    public equipoRepository: EquipoRepository,
  ) {}

  @post('/equipos')
  @response(200, {
    description: 'Equipo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Equipo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {
            title: 'NewEquipo',
            exclude: ['id'],
          }),
        },
      },
    })
    equipo: Omit<Equipo, 'id'>,
  ): Promise<Equipo> {
    return this.equipoRepository.create(equipo);
  }

  @get('/equipos')
  @response(200, {
    description: 'Array of Equipo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Equipo, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Equipo) filter?: Filter<Equipo>): Promise<Equipo[]> {
    return this.equipoRepository.find(filter);
  }

  @get('/equipos/{id}')
  @response(200, {
    description: 'Equipo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Equipo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Equipo, {exclude: 'where'})
    filter?: FilterExcludingWhere<Equipo>,
  ): Promise<Equipo> {
    return this.equipoRepository.findById(id, filter);
  }
}
