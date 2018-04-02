let express = require('express');
let search = require('./search');
let app = express.createServer();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout:false});
// 支持的方法:get,put,post, patch, del, head
// app.get('/', (req, res, next) => {})
// app.put('/post/:name', (req, res, next) => {});
// app/post('signup', (req, res, next) => {});
// app.del('/user/:id', (req, res, next) => {});
// app.patch('/user/:id', (req, res, next) => {});
// app.head('/user/:id', (req, res, next) => {})
app.get('/', (req, res) => {
    res.render('index');
});
app.listen(3000);
app.get('/search', (req, res, next) => {
    search(req.query.q, (err, tweets) => {
        if(err) {
            return next(err);
        }
        res.render('search', {results: tweets, search:req.query.q});
    });
});

app.register('.html', require('jade'));

// 错误处理
app.error((err, req, res, next) => {
    if (err.massage === 'bad response') {
        res.render('tweet-error');
    } else {
        next();
    }
})
app.error((err, req, res) => {
    res.render('error', {status: 500});
})
// 快捷方法
// request
req.header('host');// 大小写不敏感
req.accept('html');// 返回true或false
req.is('json');// 检查content-type

// response
res.header('content-type');
res.header('content-type', 'application/json'); // 检查头信息是否在response上
res.rend('template', {status:200}, (err,html) => {

})
res.send(500);// 状态码
res.send('<p>html</p>');// 发送html内容
res.send({hello: 'world'});res.send([1, 2, 3]);// 序列号成json格式
res.json(5);// 显式以json传递
res.redirect('/some/other/url');// 相当于发送302和Location
res.header('Location', '/some/other/url');
res.send(302);
// in node
res.writeHeader(302, {'Location': '/some/other/url'});
// 自定义状态码
res.redirect('/some/other/url', 300);
res.sendfile('image.jpg');

app.get('/post/:name',() => {});
app.get('/post/:name?',() => {});// 可匹配/post

app.get(/^\/post\/([a-z\d\-]*)/, ()=>{});// 正则匹配
app.get('/post/:name', (req,res,next) => {
    if (req.param.name[0] === 'h') return next();
});

// 获取动态路由
app.get('/:username', (req, res, next) => {
    // 没有匹配到其他路由
    getUser(req.param.username, (err, user) => {
        if (err) return next(err);
        if(exists) {
            res.render('profile');
        } else {
            next();
        }
    })
});

// 中间件
app.use(express.static(__dirname + '/images'));
app.use(express.cookieParser());
app.use(express.session());
// 定义一个secure中间件
function secure (req, res, next) {
    if (!req.session.logged_in) {
        return res.send(403);
    }
    next();
};
// 应用到对应路由
app.get('/home', () => {});
app.get('/about', () => {});
app.get('/roadmap', secure, () => {});// 加入了secure中间件
app.get('/route', a, b, c, () => {});//加入多个中间件

// app挂载
let app = module.exports = require('express');
app.get('/', () =>{});
app.get('/categories', ()=>{});
app.get('/search', () =>{});
app.use('/blog', require('./blog'));
// /blog /blog/categories/ /blog/search/ 都可以使用了