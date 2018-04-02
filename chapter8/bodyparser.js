 // body parser 获取post请求 req.body获取请求数据
 let connect = require('connect');
 let server = connect(connect.bodyParser(),connect.static('static')); // 创建server的快捷方式
 server.use((req, res) => {
     if ('POST' === req.method) {
         console.log(req.body.file);
     } else {
         next();
     }
 });
 server.listen(3000);
