'use strict';
const request = require('request-promise-native')
const Controller = require('egg').Controller;
const Identity = require('../service/identity')

class AuthController extends Controller {
  async authenticate () {
    const code = this.ctx.query.code
    this.identity = new Identity({
      clientId: this.ctx.app.config.githubConfig.clientId,
      clientSecret: this.ctx.app.config.githubConfig.clientSecret
    })
    const options = {
        method: 'POST',
        uri: 'https://github.com/login/oauth/access_token',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: {
            client_id: this.ctx.app.config.githubConfig.clientId,
            client_secret: this.ctx.app.config.githubConfig.clientSecret,
            code: code,
            accept: 'json'
        },
        json: true // Automatically stringifies the body to JSON
    };
    // 
    const res = await request.post(options)
    this.ctx.body = res
    // return res
  }
}

module.exports = AuthController;
