'use strict';

const mock = require('egg-mock');
const sleep = require('mz-modules/sleep');

describe('test/healthy.test.js', () => {
  let app;

  afterEach(mock.restore);

  describe('starting', () => {
    before(async () => {
      app = mock.cluster({
        baseDir: 'apps/healthapp',
        workers: 2,
      });
      // app.debug();

      // wait for one worker start
      await sleep(2000);
    });
    after(() => async () => {
      await app.ready();
      await app.close();
    });

    it('should response 503 from readiness', async () => {
      // one worker has started, but the server is starting
      await app.httpRequest()
        .get('/healthy/readiness')
        .expect(503);
    });

    it('should response 200 from liveness', async () => {
      await app.httpRequest()
        .get('/healthy/liveness')
        .expect(200);
    });
  });

  describe('up', () => {
    before(async () => {
      app = mock.cluster({
        baseDir: 'apps/healthapp',
      });
      // app.debug();
      await app.ready();
    });
    after(() => app.close());

    it('should response 200 from readiness', async () => {
      await app.httpRequest()
        .get('/healthy/readiness')
        .expect(200);
    });

    it('should response 200 from liveness', async () => {
      await app.httpRequest()
        .get('/healthy/liveness')
        .expect(200);
    });
  });

});
