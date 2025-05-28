import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../user/user.service';

@Controller()
export class UserMsController {
  constructor(private readonly userService: UserService) {}

  // Получить пользователя по id (для reviews-service)
  @MessagePattern({ cmd: 'get-user-by-id' })
  async getUserById(userId: number) {
    // Вернёт user или null
    return this.userService.findById(userId);
  }
}
