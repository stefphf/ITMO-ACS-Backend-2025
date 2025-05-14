import { RoleDto } from "./Role"

export interface UserDto {
  id: number
  username: string
  email: string
  timeCreate: Date
  about?: string
  role: RoleDto
}

export interface CreateUserDto {
  username: string
  email: string
  password: string
  about?: string
}

export interface LoginUserDto {
  username: string
  password: string
}