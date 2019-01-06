module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SessionSchema = new Schema({
    "sessionKey" : { type: String }, // key 为当前微信userName
    "sessionMember": { type: Schema.Types.ObjectId, ref: 'Member' },
    "value": {type: Object},
    "token": {type: String},
    "loginType": {type: String},
    "create_at": { type: Date, default: Date.now },
  })
  
  
  return mongoose.model('Session', SessionSchema)
}