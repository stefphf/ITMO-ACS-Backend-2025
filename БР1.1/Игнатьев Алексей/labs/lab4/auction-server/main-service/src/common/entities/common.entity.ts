import { PaginatedResponse } from './pagination.entity';

export abstract class CommonEntity {
  id: number;
}

export class CommonResponseEntity<T> extends PaginatedResponse {
  items: T[];
}
