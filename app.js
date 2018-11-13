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
    // it should be run before all `beforeClose` handler
    this.app.lifecycle.registerBeforeClose(() => {
      this.serverHealthStatus.stop();
    });

    if (err) this.serverHealthStatus.down();
  }

};
