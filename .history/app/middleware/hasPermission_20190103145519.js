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
    await next()
  }
}