import { Request } from 'express';
import { UserDto } from '../user.dto';
export interface RequestWithUser extends Request {
  user?: UserDto;
}
