let express = require('express'), mongoose = require('mongoose');
let app = express.creatServer();
let server = new mongodb.Server('127.0.0.1',27017);
mongoose.connect('mongodb://127.0.0.1/my-website');
app.listen(3000, function(){
  console.log('app is listened on 3000')
});
// 建立模型
let Schema = mongoose.Schema
let User = mongoose.model('User', new Schema({
  first:String,
  last:String,
  email:{type:String, unique: true},
  password:{type:String, index:true}
}));
app.use(function(req, res, next) {
  if (req.session.loggedIn) {
    res.local('authenticated', true);
    User.findById(req.session.loggedIn, function(err, doc) {
      if(err) {
        return next(err);
      }
      res.local('me', doc);
      next();
    })
  } else {
    res.local('authenticated', false);
    next();
  }
});
app.post('/login',function(req, res) {
  User.findOne({email:req.body.email, password:req.body.password},
  function(err, doc) {
    if (err) return next(err);
    if (!doc) {
      return res.send('<p>User not found</p>')
      req.session.loggedIn = doc._id.toString();
      res.redirect('/');
    }
  });
});
// 以上时以静态方法使用
app.post('/signup', function(req, res, next) {
  let user = new User(req.body.User).save(function(err) {
    if (err) return next(err);
    res.redirect('/login/' + user.email);
  })
})
