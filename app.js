'use strict';

module.exports = class Lifecycle {
  constructor(app) {
    this.app = app;
  }

  configDidLoad() {
    this.app.config.coreMiddleware.unshift('eggHealthy');
  }

};
