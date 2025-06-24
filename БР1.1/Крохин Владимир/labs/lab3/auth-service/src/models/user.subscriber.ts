import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { UserEntity } from './user.entity';
import hashPassword from '../utils/hash-password';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo() {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>) {
    if (event.entity.password_hash && !event.entity.password_hash.startsWith('$2b$')) {
      event.entity.password_hash = hashPassword(event.entity.password_hash);
    }
  }

  beforeUpdate(event: UpdateEvent<UserEntity>) {
    if (
      event.entity?.password_hash &&
      !event.entity.password_hash.startsWith('$2b$') &&
      event.entity.password_hash !== event.databaseEntity.password_hash
    ) {
      event.entity.password_hash = hashPassword(event.entity.password_hash);
    }
  }
}
