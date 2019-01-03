'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/code', controller.auth.authenticate)

  router.get('/view/:memberId', controller.favorite.show)
  router.get('/list/:memberId', controller.favorite.list)
};
