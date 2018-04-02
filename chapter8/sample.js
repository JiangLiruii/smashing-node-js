let connect = require('connect');
let time = require('./request-time');

let server = connect.createServer();
server.use(connect.logger('dev'));

// 实现时间中间件
server.use(time({time: 50}));
// 快速响应
server.use((req, res, next) => {
    if ('/a' === req.url) {
        res.writeHead(200);
        res.end('Fast');
    } else {
        next();
    }
});
// 慢速响应
server.use((req, res, next) => {
    if ('/b' === req.url) {
        setTimeout(() => {
            res.writeHead(200);
            res.end('Slow');
        }, 1000);
    } else next();
});
server.listen(3000);

// static中间件
server.use('/my-images', connect.static('/path/to/images'));
//max-Age
server.use('/js', connect.static('/path/to/bundles', {maxAge: 10000000000}));

// hidden 隐藏文件
server.use(connect.static('/path/ro/resources', {hidden: true}))
// query中间件
server.use((req) => {
    req.url == '/blog-posts?page=6'
});
server.use(connect.query);
// logger 中间件
// default
// dev
// short
// tiny
server.use(connect.logger('dev'));

// logger server
let connect = require('connect');
connect.createServer(connect.logger('dev'), (req, res) => { // 实际上调用use两次
    res.writeHead(200);
    res.end('hello world')
}).listen(3000);

