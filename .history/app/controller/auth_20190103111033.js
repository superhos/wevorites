'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async token() {
    // this.ctx = this.ctx.config
    this.ctx.body = this.ctx
  }
}

module.exports = AuthController;
