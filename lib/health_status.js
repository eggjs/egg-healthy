'use strict';

const HealthStatusCode = require('./health_status_code');

class HealthStatus {

  constructor() {
    this.currentStatus = HealthStatusCode.STARTING;
  }

  getStatus() {
    return this.currentStatus;
  }

  starting() {
    this.currentStatus = HealthStatusCode.STARTING;
  }

  up() {
    this.currentStatus = HealthStatusCode.UP;
  }

  down() {
    this.currentStatus = HealthStatusCode.DOWN;
  }

  stopping() {
    this.currentStatus = HealthStatusCode.STOPPING;
  }

  stopped() {
    this.currentStatus = HealthStatusCode.STOPPED;
  }

}
