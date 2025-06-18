'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.routingControllersOptions = void 0;
exports.routingControllersOptions = {
  classTransformer: true,
  validation: true,
  routePrefix: '/api',
  controllers: [__dirname + '/../controllers/*.ts'],
  middlewares: [__dirname + '/../middlewares/*.ts'],
  defaultErrorHandler: false,
};
