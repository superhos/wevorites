module.exports = app => {
  return async function hasPermission (ctx , next) {
    console.log(ctx.request.headers.Authorization)
    if (!ctx.request.headers.Authorization) {
      ctx.body = JSON.stringify({
        state: '401',
        msg: 'Please Login First'
      })
    }
    await next()
  }
}