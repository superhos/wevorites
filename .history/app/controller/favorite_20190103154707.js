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

  async create () {
    console.log(this.ctx.request.body.favData)
    const favData  = this.ctx.request.body.favData

    let doc = await this.ctx.model.Favorite
      .findOneAndUpdate(
        {
          "url" : favData.url,  // search query
          "memberId": favData.memberId
        }, 
        {
          ...favData   // field:values to update
        },
        {
          new: true,                       // return updated doc
          runValidators: true              // validate before update
        })

    if (!doc) {
      const favObj = new this.ctx.model.Favorite(favData)
      doc = await favObj.save()
    }
    
    console.log(doc)
    this.ctx.body = JSON.stringify(doc)
  }
}

module.exports = FavoriteController
