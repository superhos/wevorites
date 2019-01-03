'use strict';

const Controller = require('egg').Controller;

class FavoriteController extends Controller {
  async show() {
    const memberId = this.ctx.query.key
    if (!sessionKey) {
      throw new Error('KeyError: Key can not be null')
    }

    this.ctx.body = await this.ctx.model.Favorite.find({
      memberId
    })
    // this.ctx.body = 'hi, egg';
    let title = `${session.sessionMember.name} 的收藏夾`; //向模板传入数据
    await this.ctx.render('show.html',{
      title
    });
  }
}

module.exports = FavoriteController
