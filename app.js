var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var Posts = require('./schema/posts');
var Comments = require('./schema/comments');
var Users = require('./schema/users');

var port = process.env.port || 3000;


app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
  Posts.find({}, function (err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { posts: posts });
    }
  });
});

app.get('/post/postlist', function (req, res) {
  Posts.find({}, function (err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render('post-list', { posts: posts });
    }
  });
});

app.get('/user/:session', function (req, res) {
  Users.findById(req.params.session, function (err, userDetails) {
    if (err) {
      console.log(err);
    } else {
      app.session = userDetails;
      Posts.find({}, function (err, posts) {
        if (err) {
          console.log(err);
        } else {
          res.render('post-list', { posts: posts });
        }
      });
    }
  });
});

app.get('/posts/detail/:id', function (req, res) {
  Posts.findById(req.params.id, function (err, postDetail) {
    if (err) {
      console.log(err);
    } else {
      Comments.find({ 'postId': req.params.id }, function (err, comments) {
        res.render('post-detail', { postDetail: postDetail, userDetails: app.session, comments: comments, postId: req.params.id });
      });
    }
  });
});

app.get('/users/register', function (req, res) {
  res.render('register');
});
app.get('/users/login', function (req, res) {
  res.render('login', { Users: Users });
});
// DB connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/commenting_system', { useMongoClient: true })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));
// DB connection end


io.on('connection', function (socket) {
  socket.on('comment', function (data) {
    var commentData = new Comments(data);
    commentData.save();
    socket.broadcast.emit('comment', data);
  });
  socket.on('user', function (data) {
    console.log('-----data-----datadatadata--', data)
    var userData = new Users(data);
    userData.save();
    socket.broadcast.emit('user', data);
  });
});

http.listen(port, function () {
  console.log("Server running at port " + port);
});