'use strict';

const sleep = require('mz-modules/sleep');
const worker = require('cluster').worker;

module.exports = class Lifecycle {
  async willReady() {
    if (!worker || worker.id === 1) await sleep(5000);
  }

  async beforeClose() {
    await sleep(5000);
  }

};
