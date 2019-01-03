'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async getToken() {
    this.ctx = this.ctx.config
  }
}

module.exports = AuthController;
