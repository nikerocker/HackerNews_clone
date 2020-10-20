var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var Comments = new Schema({
  comment :String,
  commentBy: String,    
  postId :String
});
module.exports = mongoose.model('Comments', Comments);