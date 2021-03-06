

'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async show() {
    const sessionKey = this.ctx.query.id
    console.log(sessionKey)
    const res = await this.ctx.model.Session.findOne({ sessionKey }).populate('sessionMember').exec()
    this.ctx.body = JSON.stringify(res)
  }
}

module.exports = UserController;
