const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  "Uin": {type: Number},
  "UserName": {type: String},
  "NickName": {type: String},
  "HeadImgUrl": {type: String},
  "ContactFlag": {type: Number},
  "MemberCount": {type: Number},
  "MemberList": {type: Array},
  "RemarkName": {type: String},
  "HideInputBarFlag": {type: Number},
  "Sex": {type: Number},
  "Signature": {type: String},
  "VerifyFlag": {type: Number},
  "OwnerUin": {type: Number},
  "PYInitial": {type: String},
  "PYQuanPin": {type: String},
  "RemarkPYInitial": {type: String},
  "RemarkPYQuanPin": {type: String},
  "StarFriend": {type: Number},
  "AppAccountFlag": {type: Number},
  "Statues": {type: Number},
  "AttrStatus": {type: Number},
  "Province": {type: String},
  "City": {type: String},
  "Alias": {type: String, default: "Urinxs"},
  "SnsFlag": {type: Number},
  "UniFriend": {type: Number},
  "DisplayName": {type: String},
  "ChatRoomId": {type: Number},
  "KeyWord": {type: String, default: "gh_"},
  "EncryChatRoomId": {type: String},
  "favorites":  [{ type: Schema.Types.ObjectId, ref: 'favorite' }]
})

module.exports = mongoose.model('User', UserSchema)