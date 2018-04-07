import { Schema } from 'mongoose';

let express = require('express'), mongodb = require('mongodb'), mongoose = require('mongoose');
let app = express.createServer();
// 中间件
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'my secret'}));
// 指定视图选项
app.set('view engine', 'jade');
app.set('view options', {layout: false});
// 定义路由
app.get('/', function(req,res) {
  res.render('index');
});
app.get('/login', function(req, res) {
  res.render('login');
});
app.get('/signup', function(req, res) {
  res.render('signup');
})
// 链接数据库
let server = new mongodb.Server('127.0.0.1', 27017);
new mongodb.Db('my-website', server).open(function(err, client) {
  if (err) {
    throw err;
  } else {
    console.log('connected to mongodb successfully');
  }
})
// 建立collection
app.users = new mongodb.Collection(client, 'users', function() {
  if(err) throw err;
  client.ensureIndex('users', 'password', function(err) { // ensureindex, 为了后面对字段进行查询
    if (err) throw err;
    console.log('ensured indexs')
    })
});
app.listen(3000, function(){
  console.log('app is listened on 3000')
});

/**
 * 当bodyParser遇到<input name="user[last]"时,会将其格式化为:req.body.user.last
 */
app.post('/signup', function(req, res) {
  app.users.insert(req.body.user, function(err, doc) {
    if (err) {
      return next(err);
    } else {
      res.redirect('/login/' + doc[0].email);
    };
  });
});
app.get('/login/:signupname', function(req, res) {
  res.render('login', {signupEmail:req.params.signupEmail})
})
app.post('/login', function(req, res) {
  app.users.findOne({email:req.body.user.email, password:req.body.user.password}, function(err, doc) {
    if (err) return next(err);
    if(!doc) {
      return res.send('<p>User not found, Go back and try again');
      req.session.loggedIn = doc._id.toString();
      res.redirect('/');
    }
  })
})
app.get('/logout', function(req, res) {
  req.session.loggedIn = null;// req.session.regenerate();
  res.redirect('/');
})
// 身份验证中间件 authenticated, res.local
app.use(function(req, res, next) {
  if (req.session.loggedIn) {
    res.local('authenticated', true);
    // _id:$oid允许使用字符串而不是对象的形式进行查找
    app.users.findOne({_id:{$oid:req.session.loggedIn}}, function(err, doc) {
      if (err) return next(err);
      res.local('me', doc);
      next();
    })
  } else {
    res.local('authenticated', false);
    next();
  };
})
// 校验 schema

// 原子性 $set $push
// db.blogposts.update({_id:<id>},{$set: {title:'mytitle'}})
// db.blogposts.update({_id:<id>},{tags:{$push: 'newtag'}}})
mongoose.connect('mongodb://localhost/my_database');

let schema = mongoose.Schema,ObjectId = Schema.ObjectId;
// 简单使用js原生的构造器
let postSchema = new Schema({
  author:ObjectId,
  title:{type:String, default:'Untitled'}, // 创建默认值
  body:String,
  date:Date
});
let Post = mongoose.model('BlogPost', postSchema);
// 如果之后还要取用model可以用Post = mongoose.model('BlogPost');
new Post({
  title:'my Title'
}).save(function(err) {
  console.log('that was easy!');
});

// 定义嵌套的键
let Comments = new Schema({
  title:String,
  body:String,
  date:Date
})
let postSchema = new Schema({
  author:ObjectId,
  title:{type:String, default:'Untitled'}, // 创建默认值
  body:String,
  meta: {
    votes:Number,
    fave:Number
  },
  comments:{Comments}
});
// 如果要找到votes
// db.blogposts.find({'meta.votes': 5});

// 如果要对指定的键做索引
let BlogPost = new Schema({
  author:ObjectId,
  title:{type:String, index: true},
  uid:{type:String, unique:true}
});
// 设置更复杂的索引
BlogPost.index({key:-1,otherKey:1});
// 博文删除时发送电子邮件给作者 可监听事件有:save validate remove init
BlogPost.pre('remove', function(next) {
  emailAuthor(this.email, 'blog post removed');
  next();
});
BlogPost.pre('save',function(next){
  if (this.isNew) {
    // something
  } else {
    // something else
  }
});
// 查询 find count findOne remove update findById-->_id

Post.find({author:'d4ad346fdgss'})
.select('field','field2') // 只需要这两个字段
.where('title', 'my title')
.sort('content', -1) // 排序(key, 顺序)
.limit(5) // 限定结果数量
.run(function(err, post) {
  // ... 
})
.skip(10)// 跳过指定数量的文档数据, 结合分页来做
Post.count(function(err, totalPosts) {
  let numPage = Math.ceil(totalPosts / 10);
});
// ref属性
BlogPost = new Schema({
  author: {type:ObjectId, ref:'Author'}
});
// 调用ref 属性
BlogPost.find({'title':'my title'})
.populate('author') // 会返回Author
.run(function(err, doc) {
  console.log(doc.author.email)
});
// 转换
