'use strict';

module.exports = app => {
  app.get('/down', async ctx => {
    app.serverHealthStatus.down();
    ctx.body = 'done';
  });
};
