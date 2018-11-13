'use strict';

const mock = require('egg-mock');

describe('test/health.test.js', () => {
  let app;

  afterEach(mock.restore);

  describe('down', () => {
    before(async () => {
      app = mock.app({
        baseDir: 'apps/down',
      });
      await app.ready();
    });
    after(() => async () => {
      await app.close();
    });

    it('should response 503 from both readiness and liveness when call down manually ', async () => {
      await app.httpRequest()
        .get('/down')
        .expect(200);

      await app.httpRequest()
        .get('/healthy/readiness')
        .expect(503);
      await app.httpRequest()
        .get('/healthy/liveness')
        .expect(503);
    });

  });
});
