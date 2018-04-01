// global --> window 
// node只有一个process,process.title

console.log(1);
ProcessingInstruction.nextTick(function() {
  console.log(3); // 异步延后输出3
})
console.log(2);

// 绝对模块 node_module中能找到的,如fs
let fs = require('fs');
fs.readFile('/some/file', function(err, content) {
  if(!err) {console.log(content)}
});
// 相对模块
require('./module_a.js');

// 暴露API
module.exports = exports

// Events
window.addEventListener('load', function() {
  alert('窗口已加载');
});
let ajax = new XMLHttpRequest();
ajax.addEventListener('stateChange', function() {
  if (ajax.readyState === 4 && ajax.responseText) {
    console.log('get something' + ajax.responseText);
  }
});
ajax.open('GET', '/my-page');
ajax.send(null);

// event EmitterAPI
let EventEmitter = require('event').EventEmitter,
    a = new EventEmitter;
a.on('event', function() {
  console.log('something call');
});
a.emit('event');

let EventEmitter = process.EventEmitter,
    MyClass = function() {};
MyClass.prototype.__proto__ = EventEmitter.prototype; // 继承

let a = new MyClass;
a.on('event', function(){});
a.emit('event');

// 用户提交表单
http.Server(function(req, res) {
  let buf = '';
  req.on('data',function(data) {
    console.log(data);
    buf += data;
  })
  req.on('end', function() {
    console.log("finished");
  })
})
a.once();// 只触发一次

// 对二进制数据的处理 --> buffer
