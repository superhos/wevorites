module.exports = app => {
  return async function hasPermission (ctx , next) {
    console.log(ctx.request.headers)
    if (!ctx.request.headers.authorization) {
      ctx.body = JSON.stringify({
        state: '401',
        msg: 'Please Login First'
      })
      return
    }
    // 判断authorization是否存在
    const session = await ctx.model.Session.findOne({
      sessionKey: ctx.request.headers.authorization
    }).populate('sessionMember').exec()

    if (!session) {
      ctx.body = JSON.stringify({
        state: '401',
        msg: 'Please Login First'
      })
      return
    }

    // 判断资源是否属于当前访问人
    const curMemberId = ctx.params.memberId
    if (session.sessionMember._id !== curMemberId) {
      ctx.body = JSON.stringify({
        state: '403',
        msg: 'No Permission'
      })
      return
    }
    await next()
  }
}