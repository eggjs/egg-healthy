'use strict';

const sleep = require('mz-modules/sleep');
const worker = require('cluster').worker;

module.exports = class Lifecycle {
  async willReady() {
    if (worker.id === 1) await sleep(5000);
  }
};
