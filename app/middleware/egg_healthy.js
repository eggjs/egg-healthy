'use strict';

const statuses = require('statuses');
const HealthStatusCode = require('../../lib/health_status_code');

module.exports = (_, app) => {
  const config = app.config.healthy;
  return async (ctx, next) => {
    if (ctx.path === config.readinessPath) {
      ctx.status = getReadinessStatus(ctx);
      ctx.body = statuses[ctx.status];
      return;
    }

    if (ctx.path === config.livenessPath) {
      ctx.status = getLivenessStatus(ctx);
      ctx.body = statuses[ctx.status];
      return;
    }

    await next();
  };
};

function getReadinessStatus(ctx) {
  switch (ctx.app.serverHealthStatus.getStatus()) {
    case HealthStatusCode.UP:
      return 200;
    case HealthStatusCode.STARTING:
    case HealthStatusCode.DOWN:
    case HealthStatusCode.STOPPING:
    case HealthStatusCode.STOPPED:
    default:
      return 503;
  }
}

function getLivenessStatus(ctx) {
  switch (ctx.app.serverHealthStatus.getStatus()) {
    case HealthStatusCode.UP:
    case HealthStatusCode.STARTING:
      return 200;
    case HealthStatusCode.DOWN:
    case HealthStatusCode.STOPPING:
    case HealthStatusCode.STOPPED:
    default:
      return 503;
  }
}
