/** 
 *  GitHub Auth
**/
module.exports = 
class Identity {
  constructor (options) {
    this.clientId = options.clientId
    this.clientSecret = options.clientSecret
  }

  async getToken (code) {
    
  }
}