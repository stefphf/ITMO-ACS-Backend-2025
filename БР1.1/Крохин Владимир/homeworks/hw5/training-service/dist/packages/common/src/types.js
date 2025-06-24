'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RoutingKey = exports.QueueName = exports.ExchangeType = void 0;
var ExchangeType;
(function (ExchangeType) {
  ExchangeType['DIRECT'] = 'direct';
  ExchangeType['FANOUT'] = 'fanout';
  ExchangeType['TOPIC'] = 'topic';
  ExchangeType['HEADERS'] = 'headers';
})(ExchangeType || (exports.ExchangeType = ExchangeType = {}));
var QueueName;
(function (QueueName) {
  QueueName['AUTH_EVENTS'] = 'auth.events';
  QueueName['TRAINING_EVENTS'] = 'training.events';
  QueueName['REFERENCE_EVENTS'] = 'reference.events';
  QueueName['NOTES_EVENTS'] = 'notes.events';
  QueueName['AUTH_QUEUE'] = 'auth_queue';
  QueueName['TRAINING_QUEUE'] = 'training_queue';
  QueueName['REFERENCE_QUEUE'] = 'reference_queue';
  QueueName['NOTES_QUEUE'] = 'notes_queue';
})(QueueName || (exports.QueueName = QueueName = {}));
var RoutingKey;
(function (RoutingKey) {
  // Auth events
  RoutingKey['USER_CREATED'] = 'user.created';
  RoutingKey['USER_UPDATED'] = 'user.updated';
  RoutingKey['USER_DELETED'] = 'user.deleted';
  // Training events
  RoutingKey['TRAINING_CREATED'] = 'training.created';
  RoutingKey['TRAINING_UPDATED'] = 'training.updated';
  RoutingKey['TRAINING_DELETED'] = 'training.deleted';
  RoutingKey['TRAINING_PROGRESS'] = 'training.progress';
  // Reference events
  RoutingKey['REFERENCE_CREATED'] = 'reference.created';
  RoutingKey['REFERENCE_UPDATED'] = 'reference.updated';
  RoutingKey['REFERENCE_DELETED'] = 'reference.deleted';
  RoutingKey['REFERENCE_DELETE_REQUESTED'] = 'reference.delete.requested';
  RoutingKey['REFERENCE_DELETE_ALLOWED'] = 'reference.delete.allowed';
  RoutingKey['REFERENCE_DELETE_DENIED'] = 'reference.delete.denied';
  // Notes events
  RoutingKey['NOTE_CREATED'] = 'note.created';
  RoutingKey['NOTE_UPDATED'] = 'note.updated';
  RoutingKey['NOTE_DELETED'] = 'note.deleted';
})(RoutingKey || (exports.RoutingKey = RoutingKey = {}));
