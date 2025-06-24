import {
    EventSubscriber,
    EntitySubscriberInterface,
    UpdateEvent,
    InsertEvent,
} from 'typeorm';
import { UserEntity } from './user.entity';

import hashPassword from '../utils/hash-password';
import checkPassword from '../utils/check-password';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
    listenTo() {
        return UserEntity;
    }

    async beforeUpdate(event: UpdateEvent<UserEntity>) {
        if (event.entity && event.databaseEntity) {
            const changedColumns = event.updatedColumns.map(
                (col) => col.propertyName,
            );

            const isPasswordChanged = !checkPassword(
                event.databaseEntity.password_hash,
                event.entity.password_hash,
            );

            if (changedColumns.includes('password') && isPasswordChanged) {
                event.entity.password = hashPassword(event.entity.password);
            } else {
                event.entity.password = event.databaseEntity.password_hash;
            }
        }
    }

    async beforeInsert(event: InsertEvent<UserEntity>) {
        if (
            event.entity.password_hash &&
            !event.entity.password_hash.startsWith('$2b$')
        ) {
            event.entity.password_hash = hashPassword(
                event.entity.password_hash,
            );
        }
    }
}
