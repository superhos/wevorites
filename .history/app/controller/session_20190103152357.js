

'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async show() {
    const sessionKey = this.ctx.query.id
    const res = await Session.findOne({ sessionKey }).populate('sessionMember').exec()
    this.ctx.body = JSON.stringify(res)
  }
}

module.exports = UserController;
