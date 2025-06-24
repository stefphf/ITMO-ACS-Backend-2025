'use strict';
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
exports.RabbitMQService = void 0;
const common_1 = require('@app/common');
const rabbitmq_1 = require('../config/rabbitmq');
class RabbitMQService {
  constructor() {
    this.client = new common_1.RabbitMQClient(rabbitmq_1.rabbitMQConfig);
  }
  connect() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.client.connect();
    });
  }
  sendMessage(routingKey, data) {
    return __awaiter(this, void 0, void 0, function* () {
      const message = {
        type: routingKey,
        data,
        timestamp: Date.now(),
      };
      yield this.client.publish(message);
    });
  }
  publishTrainingCreated(trainingId, type, data) {
    return __awaiter(this, void 0, void 0, function* () {
      const message = {
        type: common_1.RoutingKey.TRAINING_CREATED,
        data: { id: trainingId, type, data },
        timestamp: Date.now(),
      };
      yield this.client.publish(message);
    });
  }
  publishTrainingUpdated(trainingId, type, data) {
    return __awaiter(this, void 0, void 0, function* () {
      const message = {
        type: common_1.RoutingKey.TRAINING_UPDATED,
        data: { id: trainingId, type, data },
        timestamp: Date.now(),
      };
      yield this.client.publish(message);
    });
  }
  publishTrainingDeleted(trainingId) {
    return __awaiter(this, void 0, void 0, function* () {
      const message = {
        type: common_1.RoutingKey.TRAINING_DELETED,
        data: { id: trainingId },
        timestamp: Date.now(),
      };
      yield this.client.publish(message);
    });
  }
  publishTrainingProgress(trainingId, progress) {
    return __awaiter(this, void 0, void 0, function* () {
      const message = {
        type: common_1.RoutingKey.TRAINING_PROGRESS,
        data: { id: trainingId, progress },
        timestamp: Date.now(),
      };
      yield this.client.publish(message);
    });
  }
  close() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.client.close();
    });
  }
}
exports.RabbitMQService = RabbitMQService;
