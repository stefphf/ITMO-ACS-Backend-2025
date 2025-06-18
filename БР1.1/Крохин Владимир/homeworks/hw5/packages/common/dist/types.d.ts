export declare enum ExchangeType {
  DIRECT = 'direct',
  FANOUT = 'fanout',
  TOPIC = 'topic',
  HEADERS = 'headers',
}
export declare enum QueueName {
  AUTH_EVENTS = 'auth.events',
  TRAINING_EVENTS = 'training.events',
  REFERENCE_EVENTS = 'reference.events',
  NOTES_EVENTS = 'notes.events',
  AUTH_QUEUE = 'auth_queue',
  TRAINING_QUEUE = 'training_queue',
  REFERENCE_QUEUE = 'reference_queue',
  NOTES_QUEUE = 'notes_queue',
}
export declare enum RoutingKey {
  USER_CREATED = 'user.created',
  USER_UPDATED = 'user.updated',
  USER_DELETED = 'user.deleted',
  TRAINING_CREATED = 'training.created',
  TRAINING_UPDATED = 'training.updated',
  TRAINING_DELETED = 'training.deleted',
  TRAINING_PROGRESS = 'training.progress',
  REFERENCE_CREATED = 'reference.created',
  REFERENCE_UPDATED = 'reference.updated',
  REFERENCE_DELETED = 'reference.deleted',
  REFERENCE_DELETE_REQUESTED = 'reference.delete.requested',
  REFERENCE_DELETE_ALLOWED = 'reference.delete.allowed',
  REFERENCE_DELETE_DENIED = 'reference.delete.denied',
  NOTE_CREATED = 'note.created',
  NOTE_UPDATED = 'note.updated',
  NOTE_DELETED = 'note.deleted',
}
export interface RabbitMQMessage<T = any> {
  type: RoutingKey;
  data: T;
  timestamp: number;
  correlationId?: string;
}
export interface RabbitMQConfig {
  url: string;
  exchange: string;
  exchangeType: ExchangeType;
  queue: QueueName;
  routingKey: RoutingKey;
}
