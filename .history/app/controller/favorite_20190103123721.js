'use strict';

const Controller = require('egg').Controller;

class FavoriteController extends Controller {
  async show() {
    const sessionKey = this.ctx.query.key
    if (!sessionKey) {
      throw new Error('KeyError: Key can not be null')
    }

    const session = await this.ctx.model.Session.findOne({
      sessionKey
    }).populate('sessionMember').exec()

    if (!session) {
      this.ctx.body = 'Jump to Web Site Login'
      return
    }

    this.ctx.body = await this.ctx.model.Favorite.find({
      memberId: session.sessionMember._id
    })
    // this.ctx.body = 'hi, egg';
  }
}

module.exports = FavoriteController
