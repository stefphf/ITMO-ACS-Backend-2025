import { AppDataSource } from "../AppDataSource"
import { Video } from '../models/Video'
import { Controller, Get, Delete, Route, Tags, Path, Security } from 'tsoa'
import { VideoDto } from '../dto/Video';

const repository = AppDataSource.getRepository(Video)

@Tags('Video')
@Route('video')
export class VideoController extends Controller {
  @Get()
  public async get(): Promise<VideoDto[]> {
    var videos = await repository.find({ relations: ['channel'] })
    return videos.map((video) => { return { ...video, channelId: video.channel.id } })
  }

  @Get('{id}')
  public async getOne(@Path() id: string): Promise<VideoDto | null> {
    var video = await repository.findOne({ where: { id }, relations: ['channel'] })
    if (!video) return null
    return { ...video, channelId: video.channel.id }
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