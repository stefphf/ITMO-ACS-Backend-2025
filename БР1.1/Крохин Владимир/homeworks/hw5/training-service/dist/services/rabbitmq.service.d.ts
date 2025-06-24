import { RoutingKey } from '@app/common';
export declare class RabbitMQService {
  private client;
  constructor();
  connect(): Promise<void>;
  sendMessage<T>(routingKey: RoutingKey, data: T): Promise<void>;
  publishTrainingCreated(
    trainingId: number,
    type: string,
    data: any,
  ): Promise<void>;
  publishTrainingUpdated(
    trainingId: number,
    type: string,
    data: any,
  ): Promise<void>;
  publishTrainingDeleted(trainingId: number): Promise<void>;
  publishTrainingProgress(trainingId: number, progress: number): Promise<void>;
  close(): Promise<void>;
}
