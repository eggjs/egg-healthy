'use strict';

const mock = require('egg-mock');

describe('test/healthy.test.js', () => {
  let app;
  before(() => {
    return app.ready();
  });

  after(() => app && app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    app = mock.cluster({
      baseDir: 'apps/healthapp',
    });

    await app.httpRequest()
      .get('/healthy/readiness')
      .expect(200);
    await app.httpRequest()
      .get('/healthy/liveness')
      .expect(200);

    await app.ready();

    await app.httpRequest()
      .get('/healthy/readiness')
      .expect(200);
    await app.httpRequest()
      .get('/healthy/liveness')
      .expect(200);
  });
});
