import { AppDataSource } from "../AppDataSource"
import { User } from '../models/User'
import bcryptjs from 'bcryptjs'
import signJWT from '../utils/signJWT'
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security, Request } from 'tsoa'
import { UserDto, CreateUserDto, LoginUserDto } from '../dto/User';

const repository = AppDataSource.getRepository(User)

@Tags('User')
@Route('user')
export class UserController extends Controller {
  @Get()
  public async get(): Promise<UserDto[]> {
    return await repository.find({ select: { id: true, username: true, email: true, timeCreate: true, about: true} })
  }

  @Get('{id}')
  public async getOne(@Path() id: number): Promise<UserDto | null> {
    return await repository.findOne({ where: { id }, select: { id: true, username: true, email: true, timeCreate: true, about: true} })
  }

  @Post('register')
  public async register(@Body() body: CreateUserDto): Promise<UserDto> {
    let { password } = body
    bcryptjs.hash(password, 10, async (err, hash) => {
      if (err) {
        this.setStatus(500)
        throw new Error(err.message)
      }
      else {
        body.password = hash!
        return await repository.save(body)
      }
    })
    return await repository.save(body)
  }

  @Post('login')
  public async login(@Body() body: LoginUserDto): Promise<any> {
    let { username, password } = body
    const user = await repository.findOne({ where: { username: username } })
    if (user){
      bcryptjs.compare(password, user?.password, (err, r) => {
        if (err){
          this.setStatus(401)
          throw new Error(err.message)
        }
        else if (r){
          signJWT(user, (error: any, token: any) => {
            if (error){
              this.setStatus(401)
              throw new Error(error.message)
            }
            else if (token){
              return { message: 'Auth Successfull', token, user: username }
            }
          })
        }
      })
    }
    else{
      this.setStatus(401)
      throw new Error('No user')
    }
  }

  @Put()
  @Security('jwt')
  public async update(@Body() body: Partial<CreateUserDto>, @Request() req: any): Promise<UserDto> {
    const x = await repository.findOneBy({ username: req.user.username })
    if (!x) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    if (body.password){
      bcryptjs.hash(body.password, 10, async (err, hash) => {
        if (err) {
          this.setStatus(500)
          throw new Error(err.message)
        }
        else {
          body.password = hash!
          repository.merge(x, body)
          return await repository.save(x)
        }
      })
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