'use strict';

const sleep = require('mz-modules/sleep');

module.exports = class Lifecycle {
  async willReady() {
    await sleep(5000);
  }
}
