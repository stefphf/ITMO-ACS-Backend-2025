import { AppDataSource } from "../AppDataSource"
import { Theme } from '../models/Theme'
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security } from 'tsoa'
import { ThemeDto } from '../dto/Theme';

const repository = AppDataSource.getRepository(Theme)

@Tags('Theme')
@Route('theme')
export class ThemeController extends Controller {
  @Get()
  public async get(): Promise<ThemeDto[]> {
    return await repository.find()
  }

  @Get('{id}')
  public async getOne(@Path() id: number): Promise<ThemeDto | null> {
    return await repository.findOne({ where: { id } })
  }

  @Post()
  @Security('jwt', ['admin'])
  public async create(@Body() body: { name: string }): Promise<ThemeDto> {
    return await repository.save(body)
  }

  @Put('{id}')
  @Security('jwt', ['admin'])
  public async update(@Path() id: number, @Body() body: { name: string }): Promise<ThemeDto> {
    const x = await repository.findOneBy({ id })
    if (!x) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    repository.merge(x, body)
    return await repository.save(x)
  }
  
  @Delete('{id}')
  @Security('jwt', ['admin'])
  public async remove(@Path() id: number) {
    const r = await repository.delete(id)
    if (r.affected === 0) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    return r
  }
}