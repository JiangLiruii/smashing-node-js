// 超文本传输协议
let http = require('http');
let fs = require('fs');
// http.ClientRequest();//请求
// http.ClientResponse();//响应

http.createServer(function(req, res){
  res.writeHead(200,{"Content-Type":"text/html"});// 默认为text/plain
  res.end("hello <b>world</b>");
}).listen(3000);

http.createServer((req, res) => {
  res.writeHead(200);
  res.write('Hello');
  setTimeout(function() {
    res.end('World');
  }, 1000);
}).listen(4444);

http.createServer((req, res) => {
  res.writeHead(200,{'Content-Type': 'image/png'});
  let stream = fs.createReadStream('image.png');
  stream.on('data', (data) => {
    res.write(data);
  });
  stream.on('end', ()=>{
    res.end()
  })
}).listen(3001);
// 流,pipe

http.createServer((req, res) => {
  res.writeHead(200,{'Content-Type': 'image/png'});
  let stream = fs.createReadStream('image.png');
  stream.pipe(res);  
}).listen(3002);
// 利用req.connection可获取tcp对象


/**
 * 请求的集中不同方式
 * 1 get
 * 2 patch
 * 3 post
 * 4 put
 * 5 delete
 */

