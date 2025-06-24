import { RabbitMQConfig, RabbitMQMessage, RoutingKey } from './types';
export declare class RabbitMQClient {
  private connection;
  private channel;
  private config;
  constructor(config: RabbitMQConfig);
  connect(): Promise<void>;
  publish<T>(message: RabbitMQMessage<T>): Promise<void>;
  consume(
    routingKey: RoutingKey,
    callback: (message: RabbitMQMessage) => Promise<void>,
  ): Promise<void>;
  close(): Promise<void>;
}
