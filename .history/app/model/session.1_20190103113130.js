module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MemberSchema = new Schema({
    "sessionKey" : { type: String }, // key 为当前微信userName
    "sessionMember": {type: String},
    "value": {type: Object},
    "create_at": { type: Date, default: Date.now },
  })
  
  
  return mongoose.model('Member', MemberSchema)
}