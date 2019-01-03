const mongoose = require('mongoose')
const { Schema } = mongoose

const SessionSchema = new Schema({
  "sessionKey" : { type: String }, // key 为当前微信userName
  "sessionMember": {type: String},
  "value": {type: Object},
  "create_at": { type: Date, default: Date.now },
})

module.exports = mongoose.model('Session', SessionSchema)