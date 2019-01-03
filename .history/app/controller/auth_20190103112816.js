'use strict';
const Controller = require('egg').Controller;
const Identity = require('../service/identity')

class AuthController extends Controller {
  async authenticate () {
    const code = this.ctx.query.code
    this.identity = new Identity({
      clientId: this.ctx.app.config.githubConfig.clientId,
      clientSecret: this.ctx.app.config.githubConfig.clientSecret
    })
    const token = await this.identity.getToken(code)
    const userInfo = await this.identity.getUserInfo(token)
    
    this.ctx.body = userInfo
    // return res
  }
}

module.exports = AuthController;
