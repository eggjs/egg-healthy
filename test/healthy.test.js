'use strict';

const mock = require('egg-mock');

describe('test/healthy.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/healthy-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, healthy')
      .expect(200);
  });
});
