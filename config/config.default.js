'use strict';

/**
 * egg-healthy default config
 * @member Config#healthy
 * @property {String} readinessPath - The path of readiness health check
 * @property {String} livenessPath - The path of liveness health check
 */
exports.healthy = {
  readinessPath: '/healthy/readiness',
  livenessPath: '/healthy/liveness',
};
