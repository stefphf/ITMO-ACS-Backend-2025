'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RabbitMQClient = void 0;
const amqp = __importStar(require('amqplib'));
class RabbitMQClient {
  constructor(config) {
    this.connection = null;
    this.channel = null;
    this.config = config;
  }
  connect() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        this.connection = yield amqp.connect(this.config.url);
        this.channel = yield this.connection.createChannel();
        if (!this.channel) {
          throw new Error('Failed to create channel');
        }
        // Create exchange
        yield this.channel.assertExchange(
          this.config.exchange,
          this.config.exchangeType,
          {
            durable: true,
          },
        );
        // Create queue
        yield this.channel.assertQueue(this.config.queue, { durable: true });
        // Bind queue to exchange
        yield this.channel.bindQueue(
          this.config.queue,
          this.config.exchange,
          this.config.routingKey,
        );
        console.log(`Connected to RabbitMQ: ${this.config.queue}`);
      } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        throw error;
      }
    });
  }
  publish(message) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.channel) {
        throw new Error('Channel not initialized');
      }
      try {
        this.channel.publish(
          this.config.exchange,
          this.config.routingKey,
          Buffer.from(JSON.stringify(message)),
          { persistent: true },
        );
      } catch (error) {
        console.error('Failed to publish message:', error);
        throw error;
      }
    });
  }
  consume(routingKey, callback) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.channel) {
        throw new Error('Channel not initialized');
      }
      try {
        yield this.channel.consume(this.config.queue, msg =>
          __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (msg) {
              try {
                const content = JSON.parse(msg.content.toString());
                if (content.type === routingKey) {
                  yield callback(content);
                }
                (_a = this.channel) === null || _a === void 0
                  ? void 0
                  : _a.ack(msg);
              } catch (error) {
                console.error('Error processing message:', error);
                (_b = this.channel) === null || _b === void 0
                  ? void 0
                  : _b.nack(msg, false, true);
              }
            }
          }),
        );
      } catch (error) {
        console.error('Failed to consume messages:', error);
        throw error;
      }
    });
  }
  close() {
    return __awaiter(this, void 0, void 0, function* () {
      var _a, _b;
      try {
        yield (_a = this.channel) === null || _a === void 0
          ? void 0
          : _a.close();
        yield (_b = this.connection) === null || _b === void 0
          ? void 0
          : _b.close();
        console.log('RabbitMQ connection closed');
      } catch (error) {
        console.error('Error closing RabbitMQ connection:', error);
        throw error;
      }
    });
  }
}
exports.RabbitMQClient = RabbitMQClient;
