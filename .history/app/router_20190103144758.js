'use strict';
const hasPermission = require('./middleware/hasPermission')
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/code', controller.auth.authenticate)

  router.get('/view/:memberId', hasPermission, controller.favorite.view)
  router.get('/list/:memberId', hasPermission, controller.favorite.list)
};
