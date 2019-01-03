module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FavoriteSchema = new Schema({
    "memberId" : { type: Schema.Types.ObjectId, ref: 'Member' },
    "title": {type: String},
    "url": {type: String},
    "thumb": {type: String},
    "keyword": {type: Array},
    "state": {type: Number, default: 0}, // 0 未读， 0-1阅读进度 ， 1已读完
    "create_at": { type: Date, default: Date.now },
  })
  
  return mongoose.model('Favorite', FavoriteSchema)
}