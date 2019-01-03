'use strict';
const Controller = require('egg').Controller;
const Identity = require('../service/identity')

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
      "sessionKey" : wechatUserName, // key 为当前微信userName
      "sessionMember": member.id,
      "value": {isLogin: true},
    })

    await session.save()

    this.ctx.body = session
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
