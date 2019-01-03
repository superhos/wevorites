'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // this.ctx.body = await this.ctx.model.User.find({})
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
