module.exports = app => {
  return async function hasPermission (ctx , next) {
    console.log(ctx.request.headers)
    await next()
  }
}