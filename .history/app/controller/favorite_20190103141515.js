'use strict';

const Controller = require('egg').Controller;

class FavoriteController extends Controller {
  async show() {
    const memberId = this.ctx.query.key
    if (!memberId) {
      throw new Error('KeyError: Key can not be null')
    }

    const member = await this.ctx.model.Favorite.findOne({
      memberId
    }).populate('favorites').exec()

    // const data = await this.ctx.model.Favorite.find({
    //   memberId
    // })
    console.log(member)
    // // this.ctx.body = 'hi, egg';
    let title = `${member.name} 的收藏夾`; //向模板传入数据
    await this.ctx.render('show.html',{
      title
    });
  }
}

module.exports = FavoriteController
