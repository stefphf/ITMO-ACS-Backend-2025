import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AuctionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  logger: Logger = new Logger(AuctionGateway.name);

  private userSockets: Map<number, Set<string>> = new Map();
  private auctionSubscriptions: Map<number, Set<string>> = new Map();

  constructor(private readonly prisma: PrismaClient) {}

  async handleConnection(client: Socket) {
    try {
      const userId = client.handshake.query.userId;
      if (userId) {
        const userIdNum = Number(userId);
        if (!this.userSockets.has(userIdNum)) {
          this.userSockets.set(userIdNum, new Set());
        }
        this.userSockets.get(userIdNum)?.add(client.id);
      }
    } catch (error) {
      this.logger.error('Error in handleConnection', error);
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const userId = client.handshake.query.userId;
      if (userId) {
        const userIdNum = Number(userId);
        this.userSockets.get(userIdNum)?.delete(client.id);
        if (this.userSockets.get(userIdNum)?.size === 0) {
          this.userSockets.delete(userIdNum);
        }
      }
    } catch (error) {
      this.logger.error('Error in handleDisconnect', error);
    }
  }

  @SubscribeMessage('subscribeToAuctions')
  async handleSubscribeToAuctions(client: Socket, auctionIds: number[]) {
    try {
      this.auctionSubscriptions.forEach((subscribers, auctionId) => {
        subscribers.delete(client.id);
        if (subscribers.size === 0) {
          this.auctionSubscriptions.delete(auctionId);
        }
      });

      auctionIds.forEach((auctionId) => {
        if (!this.auctionSubscriptions.has(auctionId)) {
          this.auctionSubscriptions.set(auctionId, new Set());
        }
        this.auctionSubscriptions.get(auctionId)?.add(client.id);
      });
    } catch (error) {
      this.logger.error('Error in handleSubscribeToAuctions', error);
    }
  }

  @SubscribeMessage('unsubscribeFromAllAuctions')
  async handleUnsubscribeFromAllAuctions(client: Socket) {
    try {
      this.auctionSubscriptions.forEach((subscribers, auctionId) => {
        subscribers.delete(client.id);
        if (subscribers.size === 0) {
          this.auctionSubscriptions.delete(auctionId);
        }
      });
    } catch (error) {
      this.logger.error('Error in handleUnsubscribeFromAllAuctions', error);
    }
  }

  async broadcastAuctionUpdate(auctionId: number, data: any) {
    try {
      const subscribers = this.auctionSubscriptions.get(auctionId);
      if (subscribers) {
        subscribers.forEach((socketId) => {
          this.server.to(socketId).emit('auctionUpdate', {
            auctionId,
            ...data,
          });
        });
      }
    } catch (error) {
      this.logger.error('Error in broadcastAuctionUpdate', error);
    }
  }

  // Метод для отправки информации о новой ставке
  async broadcastNewBid(auctionId: number, bidData: any) {
    try {
      const subscribers = this.auctionSubscriptions.get(auctionId);
      if (subscribers) {
        subscribers.forEach((socketId) => {
          this.server.to(socketId).emit('newBid', {
            auctionId,
            ...bidData,
          });
        });
      }
    } catch (error) {
      this.logger.error('Error in broadcastNewBid', error);
    }
  }

  // Метод для отправки информации об изменении статуса аукциона
  async broadcastAuctionStatusChange(auctionId: number, status: string) {
    try {
      const subscribers = this.auctionSubscriptions.get(auctionId);
      if (subscribers) {
        subscribers.forEach((socketId) => {
          this.server.to(socketId).emit('auctionStatusChange', {
            auctionId,
            status,
          });
        });
      }
    } catch (error) {
      this.logger.error('Error in broadcastAuctionStatusChange', error);
    }
  }
}
