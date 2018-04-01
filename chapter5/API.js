/**
 * 需求
 * 1 创建模块
 * 2 决定采用同步fs还是异步fs
 * 3 理解什么是流(stream)
 * 4 实现输入输出
 * 5 重构
 * 6 使用fs进行文件交互
 */

process.arg.slice(2)
// 获取当前目录
process.cwd()
// 更改工作目录
process.chdir()
// 环境变量
process.env.SHELL
process.env.NODE_ENV// production or development
process.exit()
// 信号
process.on('SIGKILL', function(){});

// Stream
let fs = require('fs');
fs.readFile('my-file.txt', function() {});// 文件读取完毕之后才会执行
let stream = fs.createReadStream('my-file.txt');
stream.on('data', function(chunk){
  // 处理文件部分内容
});
stream.on('end', function(){});// 读取完毕

// 监视
let fs = require('fs');
let stream = fs.createReadStream('my-file.txt');
let files = fs.readdirSync(process.cwd());
files.forEach((file) => {
  if(/\/.css/.test(file)) {
    fs.watchFile(process.cwd() + '/' + file, function(){
      console.log('----' + file + 'changed');
    })
  }
})