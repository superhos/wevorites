module.exports = app => {
  return async function hasPermission (ctx , next) {
    if (ctx.request.method === 'GET') {
      await next()
      return
    }

    if (!ctx.request.headers.authorization) {
      ctx.body = JSON.stringify({
        state: '401',
        msg: 'Please Login First'
      })
      return
    }
    // 判断authorization是否存在
    const token = ctx.request.headers.authorization.replace('Bearer', '').trim()
    let res = await ctx.curl(`https://api.github.com/user?access_token=${token}`)
    res = JSON.parse(res.data.toString())
    if (!res || !res.id) {
      ctx.body = JSON.stringify({
        state: '401',
        msg: 'Please Login First'
      })
      return
    }

    const member = await ctx.model.Member.findOne({
      id: res.id
    }).exec()

    if (!member) {
      ctx.body = JSON.stringify({
        state: '401',
        msg: 'Please Login First'
      })
      return
    }

    // 判断资源是否属于当前访问人
    const favId = ctx.params.id
    const curFav = await ctx.model.Favorite.findOne({
      _id: favId
    }).exec()

    if (!curFav) {
      ctx.body = JSON.stringify({
        state: '404',
        msg: 'Fav doesn\'t exist.'
      })
      return
    }

    if (member._id.toString() !== curFav.memberId.toString()) {
      ctx.body = JSON.stringify({
        state: '403',
        msg: 'No Permission'
      })
      return
    }

    await next()
  }
}