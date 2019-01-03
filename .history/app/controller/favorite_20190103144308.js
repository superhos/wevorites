'use strict';

const Controller = require('egg').Controller;

class FavoriteController extends Controller {
  async view () {
    const memberId = this.ctx.params.memberId
    if (!memberId) {
      throw new Error('KeyError: Key can not be null')
    }

    const member = await this.ctx.model.Member.findOne({
      _id: memberId
    }).populate('favorites').exec()

    console.log(member)
    // // this.ctx.body = 'hi, egg';
    let title = `${member.name} 的收藏夾`; //向模板传入数据
    await this.ctx.render('show.html',{
      title
    });
  }

  async list () {
    const memberId = this.ctx.params.memberId
    if (!memberId) {
      throw new Error('ParamError: memberId can not be null')
    }

    const favs = await this.ctx.model.Favorite.find({
      memberId
    })

    this.ctx.body = JSON.stringify(favs)
  }
}

module.exports = FavoriteController
