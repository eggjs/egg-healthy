'use strict';

module.exports = app => {
  app.get('/exception', ctx => {
    setTimeout(() => {
      throw new Error('exception');
    }, 10);
    ctx.body = 'done';
  });
};
