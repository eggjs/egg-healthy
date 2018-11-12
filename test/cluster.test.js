'use strict';

const mock = require('egg-mock');
const sleep = require('mz-modules/sleep');

describe('test/cluster.test.js', () => {
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
      await sleep(4500);
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

  describe('stop', () => {
    let p;
    before(async () => {
      app = mock.cluster({
        baseDir: 'apps/healthapp',
      });
      app.debug();
      await app.ready();
    });
    after(() => p);

    // worker will disconnect first after kill master, so requesting will be fail
    it.skip('should response 503 from both readiness and liveness', async () => {
      p = app.close();

      // wait for triggering close
      await sleep(1000);

      await app.httpRequest()
        .get('/healthy/readiness')
        .expect(503);

      await app.httpRequest()
        .get('/healthy/liveness')
        .expect(503);
    });
  });

  describe('restarting', () => {
    before(async () => {
      mock.env('default');
      app = mock.cluster({
        baseDir: 'apps/healthapp',
      });
      app.debug();
      await app.ready();
    });
    after(() => async () => {
      await app.close();
    });

    it('should response 200 from readiness and liveness', async () => {
      await app.httpRequest()
        .get('/exception')
        .expect(200);

      await sleep(1000);

      app.expect('stdout', /app_worker#2:\d+ started/);

      await app.httpRequest()
        .get('/healthy/readiness')
        .expect(200);

      await app.httpRequest()
        .get('/healthy/liveness')
        .expect(200);
    });
  });

});
