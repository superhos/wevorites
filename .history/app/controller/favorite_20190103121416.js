'use strict';

const Controller = require('egg').Controller;

class FavoriteController extends Controller {
  async show() {
    const sessionKey = this.ctx.query.key
    if (!sessionKey) {
      throw new Error('KeyError: Key can not be null')
    }
    

    this.ctx.body = await this.ctx.model.Favorite.find({

    })
    // this.ctx.body = 'hi, egg';
  }
}

module.exports = FavoriteController
