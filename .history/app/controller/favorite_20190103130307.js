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
    let title = `${session.sessionMember.name} 的收藏夾`; //向模板传入数据
    const res = await this.ctx.render('show.ejs',{
      title: title
    });

    console.log(res)
  }
}

module.exports = FavoriteController
