let connect = require('connect');
let server = connect.createServer();
// use 添加static中间件, 
server.use(connect.static(__dirname + '/website'));
server.listen(3000);

// 处理req, res, next
server.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
})
serve.use((req,res,next) => {
    if (req.method === 'GET' && req.url.substr(0,7) === '/images') {
        // 托管图片
    } else {
        next();
    }
});
serve.use((req, res, next) => {
    if (req.method === 'GET' && req.url === '/') {
        // 响应index.html
    } else {
        next();
    }
});
serve.use((req, res, next) => {
    res.writeHead(404);
    res.end('Not Found');
})

connect.logger('type is:res[content-type]')
/**
 * logger
 * 
 * :req[header]
 * :res[header]
 * :http-version
 * :date
 * :remote-addr
 * :content-type
 * :content-length
 * :response-time
 * :url
 * :referrer
 * :status
 */
