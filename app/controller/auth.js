'use strict';
const Controller = require('egg').Controller;
const Identity = require('../service/identity')
const uuidv4 = require('uuid/v4')

class AuthController extends Controller {
  async authenticate () {
    const code = this.ctx.query.code
    const wechatUserName = this.ctx.query.state
    this.identity = new Identity({
      clientId: this.ctx.app.config.githubConfig.clientId,
      clientSecret: this.ctx.app.config.githubConfig.clientSecret
    })
    const token = await this.identity.getToken(code)
    if (!token) {
      throw new Error('AuthError: Some Wrong')
    }
    const userInfo = await this.identity.getUserInfo(token)
    
    // 检查member是否存在
    const member = await this.checkAndSave(userInfo)

    // 保存 session
    const session = new this.ctx.model.Session({
      "sessionKey" : wechatUserName !== 'login_web' ? wechatUserName : uuidv4(), // key 为当前微信userName
      "sessionMember": member._id,
      "loginType" : wechatUserName !== 'login_web' ? 'wechat' : 'web',
      "token": token,
      "value": {isLogin: true},
    })
    
    await session.save()
    
    if (wechatUserName !== 'login_web') {
      // this.ctx.body = session
      let title = `${member.name}`; //向模板传入数据
      await this.ctx.render('login_success',{
        member: JSON.stringify(member),
        title,
      })
    } else {
      // web version
      this.ctx.session.info = session
      this.ctx.redirect(`/view/${member._id}`)
    }
    // return res
  }

  async checkAndSave (userInfo) {
    let member = await this.ctx.model.Member.findOne({
      id : userInfo.id
    })

    // 不存在则保存
    if (!member) {
      member = new this.ctx.model.Member(userInfo)
      await member.save()
    }

    return member
  }

}

module.exports = AuthController;
