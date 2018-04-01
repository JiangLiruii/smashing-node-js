// php 对响应的多线程, node单线程

// 非阻塞
console.log('hello');
setTimeout(() => {
  console.log('world')
}, 3000);
console.log('bye');
// hello bye world

let start = Date.time();
setTimeout(() => {
  console.log(Date.now() - start);
  for (let i = 0; i < 10000; i += 1) {}
}, 1000);
setTimeout(() => {
  console.log(Date.now() - start);
}, 2000);// 时间间隔大于2s,进程被for循环阻塞了

// 调用堆栈
function a() {
  b();
}
function b() {};
// 堆栈为先a后b

// Http 先http--> a -->b
http = require('http')
http.createServer(function() {
  a();
});
function a() {
  b();
}
function b() {};
// 在createserver的线程中不能响应其余的网络请求,但是回调在这里就很有作用,非阻塞

http.createServer(function(req, res) {
  database.getInformation(function(data) {
    res.writeHead(200);
    res.end(data)
  });// 调用数据库读数据这里是非阻塞的
});

http.createServer(function() {
  throw new Error('错误不会被捕获'); // 此时会报错
}).listen(3000);
process.on('uncaughtException', function(err) {
  console.error(err);
  process.exit();
});

// telnet
let net = require('net');
net.createServer(function(connection) {
  connection.on('error', function(err) { // 捕获error事件
    console.err(err);
  }).listen(400);
});
// 除了error和uncaughtException外,其余的回调第一个都是null,这两个为err

// 无法捕获未来的错误
function c() {
  b();
}
function b() {
  a();
}
function a() {
  setTimeout(() => {
    throw new Error('here');
  }, 200);
}
try {
  c();
} catch(err) {consol.error(err)};// 无法捕获