

'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async show() {
    const sessionKey = this.ctx.params.id
    console.log(this.ctx.params)
    const res = await this.ctx.model.Session.findOne({ sessionKey }).populate('sessionMember').exec()
    this.ctx.body = JSON.stringify(res)
  }
}

module.exports = UserController;
