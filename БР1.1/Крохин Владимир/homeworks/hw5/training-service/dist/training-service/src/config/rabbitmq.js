'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.rabbitMQConfig = void 0;
const common_1 = require('@app/common');
exports.rabbitMQConfig = {
  url: process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672',
  exchange: 'training.exchange',
  exchangeType: common_1.ExchangeType.DIRECT,
  queue: common_1.QueueName.TRAINING_EVENTS,
  routingKey: common_1.RoutingKey.TRAINING_CREATED,
};
