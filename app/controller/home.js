'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = JSON.stringify({'version':'1.0.0'});
  }
}

module.exports = HomeController;
