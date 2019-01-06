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

    if (!member) {
      this.ctx.body = JSON.stringify({
        state:404,
        msg: 'Member not exists'
      })
      return
    }

    let isAdmin = false
    let isLogin = false
    let selfInfo = {}
    if (this.ctx.session.info) {
      isLogin = true
      isAdmin = this.ctx.session.info.sessionMember === memberId
      selfInfo = await this.ctx.model.Member.findOne({
        _id: this.ctx.session.info.sessionMember
      }).exec()
    }

    // // this.ctx.body = 'hi, egg';
    let title = `${member.name}`; //向模板传入数据
    await this.ctx.render('show.html',{
      title,
      memberId,
      clientId: this.ctx.app.config.githubConfig.clientId,
      member: JSON.stringify(member),
      isAdmin,
      isLogin,
      selfInfo: JSON.stringify(selfInfo),
      token: this.ctx.session.info ? this.ctx.session.info.token : '',
      webServer: this.ctx.app.config.webURL
    });
  }

  // async list () {
  //   const memberId = this.ctx.params.memberId
  //   if (!memberId) {
  //     throw new Error('ParamError: memberId can not be null')
  //   }

  //   const favs = await this.ctx.model.Favorite.find({
  //     memberId
  //   },null, {
  //     skip:0, // Starting Row
  //     limit:16, // Ending Row
  //     sort:{
  //         create_at: -1 //Sort by Date Added DESC
  //     }
  //   }).populate('memberId').exec()

  //   this.ctx.body = JSON.stringify(favs)
  // }

  async index () {
    const persize = this.ctx.query.persize || 10
    const curindex = this.ctx.query.curindex || 0
    const memberId = this.ctx.query.memberId
    const search = this.ctx.query.search || ''
    if (!memberId) {
      throw new Error('ParamError: memberId can not be null')
    }

    const query = {
      memberId
    }

    if (search && search.length > 0) {
      query.title = {
        $regex: `.*${search}.*`,
        $options: 'i'
      }
    }

    const favs = await this.ctx.model.Favorite.find(query, null, {
      skip: +curindex, // Starting Row
      limit: +persize, // Ending Row
      sort:{
        state: 1,
        create_at: -1, //Sort by Date Added DESC
      }
    }).populate('memberId').exec()

    this.ctx.body = JSON.stringify({
      state:200,
      data: favs
    })
  }

  async create () {
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
    
    this.ctx.body = JSON.stringify(doc)
  }

  async update () {
    const favId = this.ctx.params.id
    const favData = this.ctx.request.body.favData

    const doc = await this.ctx.model.Favorite
      .findOneAndUpdate(
        {
          "_id": favId
        }, 
        {
          ...favData   // field:values to update
        },
        {
          new: true,                       // return updated doc
          runValidators: true              // validate before update
        })
    
      if (!doc) {
        this.ctx.body = JSON.stringify({
          state: '401',
          msg: 'Document not found.'
        })

        return
      }

      this.ctx.body = JSON.stringify({
        state: '200',
        msg: 'Success.'
      })
  }

  async destroy () {
    const favId = this.ctx.params.id
    const res = await this.ctx.model.Favorite.deleteOne({
      '_id': favId
    })

    if (!res) {
      this.ctx.body = JSON.stringify({
        state: '401',
        msg: 'Document not found.'
      })

      return
    }

    this.ctx.body = JSON.stringify({
      state: '200',
      msg: 'Success.'
    })
  }
}

module.exports = FavoriteController
