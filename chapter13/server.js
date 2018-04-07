let express = require('express'), mysql = require('mysql');
let app = express.createServer();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view options', {layout: false});
app.get('/', function(req, res, next) {
  res.render('index');
});
app.post('/create', function(req, res, next) {
});
app.get('/item/:id', function(req, res, next) {
  res.render('item');
});
app.get('/item/:id/review', function(req, res, next) {

});
app.listen(3000, function(){
  console.log('listenning 3000 port');
});
let db = mysql.createClient({
  host: 'localhost',
  database: 'cart-example'
});
// 要设置数据库的用户名和密码, 就在调用create Client时传递user和password
let config = require('./config');
let db = mysql.createClient(config);
app.get('/', function(req, res, next) {
  res.render('index', {item:[]});
});
app.use(express.bodyParser());
// 创建商品路由
app.post('/create', (req, res, next) => {
  db.query('INSERT INTO item SET title= ?, description= ?',[req.body.title, req.body.description], function(err, info) {
    if (err) return next(err);
    console.log('- item created with id %s', info.insertId);
    res.redirect('/');
  });
});
app.post('/item/:id/review', (req, res, next) => {
  db.query('INSERT INTO reviews SET item_id = ?, stars = ? text = ?',[req.param.id, req.body.stars, req.body.text], (err, info) => {
    if (err) return next(err);
    console.log('review created with id %s', info.insertId);
    res.redirect('/item' + req.param.id);
  });
});
app.get('/', (req, res, next) => {
  db.query('SELECT id, title, description FROM item', (err, res) => {
    res.render('index',{item:results});
  });
});
app.get('/item/:id',(req, res, next) => {
  function getItem(fn) {
    db.query('SELECT id, title, description FROM item WHERE id = ? LIMIT 1',[req.params.id],(err,result) => {
      if (err) return next(err);
      if(!result[0]) return res.send(404);
      fn(result[0]);
    });
  };

  function getReviews(item_id, fn) {
    db.query('SELECT text, stars FROM review WHERE item_id = ?',[item_id],(err, results) => {
      if (err) return next(err);
      fn(results);
    });
  };

  getItem((function(item) {
    getReviews(item.id,function(reviews) {
      res.render('item', {item:item, reviews: reviews})
    })
  }))

})