'use strict';

module.exports = class Lifecycle {
  constructor(app) {
    this.app = app;
    this.serverHealthStatus = app.serverHealthStatus;
  }

  configDidLoad() {
    this.app.config.coreMiddleware.unshift('eggHealthy');
  }

  async serverDidReady() {
    this.serverHealthStatus.up();
  }

  async didReady(err) {
    if (err) this.serverHealthStatus.down();
  }

  async beforeClose() {
    this.serverHealthStatus.stop();
  }
};
