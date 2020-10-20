var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var Users = new Schema({
    Name :String,    
    ContactNumber :String,
    Age : Number,
    EmailID: String,
    Password: String
  });
module.exports = mongoose.model('Users', Users);