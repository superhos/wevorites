module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MemberSchema = new Schema({
    avatar_url: {type: String},
    blog: {type: String},
    collaborators: {type: Number},
    company: {type: String},
    created_at: {type: String},
    disk_usage: {type: Number},
    email: {type: String},
    events_url: {type: String},
    followers: {type: Number},
    followers_url: {type: String},
    following: {type: Number},
    following_url: {type: String},
    gists_url: {type: String},
    gravatar_id: {type: String},
    hireable: {type: Boolean},
    html_url: {type: String},
    id: {type: Number},
    location: {type: String},
    login: {type: String},
    name: {type: String},
    node_id: {type: String},
    organizations_url: {type: String},
    owned_private_repos: {type: Number},
    plan: {type: Object},
    private_gists: {type: Number},
    public_gists: {type: Number},
    public_repos: {type: Number},
    received_events_url: {type: String},
    repos_url: {type: String},
    site_admin: {type: Boolean},
    starred_url: {type: String},
    subscriptions_url: {type: String},
    total_private_repos: {type: Number},
    two_factor_authentication: {type: Boolean},
    type: {type: String},
    updated_at: {type: String},
    url: {type: String},
    "favorites":  [{ type: Schema.Types.ObjectId, ref: 'favorite' }]
  })
  
  
  return mongoose.model('Member', MemberSchema)
}