'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async create() {
    const user = this.ctx.request.body.user
    let doc = await this.ctx.model.User
      .findOneAndUpdate(
        {
          "UserName" : user.UserName  // search query
        }, 
        {
          ...user   // field:values to update
        },
        {
          new: true,                       // return updated doc
          runValidators: true              // validate before update
        })
        
    if (!doc) {
      let userData = new this.ctx.model.User(user)
      doc = await userData.save()
    }

    this.ctx.body = JSON.stringify(doc)
  }
}

module.exports = UserController;
