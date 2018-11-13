'use strict';

const HealthStatus = require('../../lib/health_status');
const SERVER_HEALTH_STATUS = Symbol('Application#serverHealthStatus');

module.exports = {
  get serverHealthStatus() {
    if (!this[SERVER_HEALTH_STATUS]) {
      this[SERVER_HEALTH_STATUS] = new HealthStatus();
    }
    return this[SERVER_HEALTH_STATUS];
  },
};
