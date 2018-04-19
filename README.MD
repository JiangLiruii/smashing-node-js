# 整个项目架构参照[Smashing Node.js:Javascript Everywhere](https://book.douban.com/subject/6915862/)一书而成,从公司里发现了这本书,当一翻开目录的一瞬间就知道十分的适合我去读

## chapter1 介绍node环境的安装,包含WIndows,OS X 和Linux的安装,介绍了npm仓库的强大以及不同指令

- -g 全局安装,可以直接在程序中调用,不会自动写入package依赖中,如果使用需要手动添加.

- -S 生产环境安装,会自动将安装模块写入dependencies中

- -D 开发环境安装,会自动将安装模块写入devDependencies中

- -i install的缩写

## chapter2 JavaScript概览

- 类型(5大基本类型 string boolean undefined null number, 3大引用类型 object, aray,function),当然严格来说js中万物皆**object**

- 函数
  - (apply call)
  - 参数数量(length)
  - 闭包
  - 类(ES6中的class语法糖,function的prototype)
  - 继承 prototype

- TRY{} CATCH()

- **v8特性**
  - KEYS Object.keys(object)
  - ISARRAY Array.isarray([])
  - 数组方法
    - forEach $.each
    - filter $.grep
    - map $.map
    - reduce $.reduce
    - reduceRight
    - lastIndexOf
  - 字符串方法 .trim
  - JSON
    - JSON.toString
    - JSON.parse
  - function
    - BIND(只是绑定,而不像apply或call那样即时调用)
    - NAME非标准函数名 `let a = function woot(){};a.name === woot;// true`,方便显示堆栈信息
    - __proto__ 定义继承,原型的创造者`Child.prototype.__proto__ = Parent.prototype`
    - 储存器 prototype属性
      - __defineGetter__
      - __defineSetter__

- chapter3 阻塞与非阻塞IO
  - Node是单线程(不一定是单进程),child_process 支持子线程
  - IO非阻塞,操作系统怎么处理这个IO不管,我只分发IO事件,异步等待完成信号而已.
  - 错误处理
    - throw error
    - next(error)
    - 绝大部分异步接收的API第一个参数都是null或error
    - try{}catch(e){}中无法捕获未来执行的错误,比如setTimeout
- chapter4 Node中的JavaScript
  - global 跟window一样,全局可访问
  - process 全局执行的上下文都在这里面,只有一个process对象 
    - process.cwd() 执行node命令的文件夹地址 __dirname 文件所在目录
    - process.argv.slice(2)
    - process.env()
    - process.exit()
    - 信号 process.on('SIGKILL',function(){})
  - process.nextTick()-->idle观察 最快调用,会阻塞CPU setImmediately() -->check观察,主线程执行完毕之后执行 约等于 setTimeout(,0)-->IO观察,主线程执行完毕之后执行(更快执行的概率更大)
  - 模块
    - require require('fs') 绝对模块 require('./a') 相对模块
    - exports = module.export暴露API
  - 事件
    - ajax `XHTMLRequest addEventListener stateChage readyState responseText open send`
    - EventEmitter `let eventEmitter = require('events').EventEmitter, a = new eventEmitter;a.on();a.once();a.emit()`
  - Buffer
    - 处理二进制 `new Buffer('png', 'base64')`

- chapter5 CLI and FS API
  - package.json
  - FS API
    - readdirSync('.')
    - readdir(__dirname, async)
    - stat `fs.stat(__dirname, function(err, stat){if (stat.isDirectory)})`
    - `readFile(__dianeme + '/' + filename,'utf8',function(err, data){})`
    - `stream = fs.createReadStream('my-file.txt');stream.on('data',function(chunk){});stream.on('end',function(end){})`
    - watchFile 监视某个文件 watch监视目录
  - 流(stream)
    - stdout
    - stdin
      - resume()
      - setEncoding('utf8')
    - stderr
    - on('data',handler)
- chapter6 TCP
  - 面向连接 保证顺序
    - IP基于数据报 独立传输 无序
    - tcp基于IP包含标识该连接以及数据流顺序的数据报
  - 面向字节 对消息格式没有限制
  - 可靠性 超时确认 数据重发
  - 流控制 速度均衡
  - 拥堵控制 控制传输速率保证QoS
  - 事件
    - data
    - end
    - close
    - connect
- chapter7 [HTTP](/chapter7/HTTP.js)
  - createServer
    - req
      - url
      - method
    - res
      - setEncoding()
      - writeHead
      - content-type text/html
      - on
        - end
        - data
  - listen
  - fs.createReadStream('img').pipe(res) **默认使用Chunked传输**
  - querystring 解析字符串 .stringify
  - superagent request.get .send .set .end

## Web开发

- chapter8 Connect
  - 托管静态文件
  - 处理错误或不存在URL
  - 处理不同类型请求
  - 中间件
    - use()
    - next()
    - static 静态托管
      - url 对应 路径
      - maxAge
      - hidden-- 隐藏文件
    - logger
      - default
      - dev
      - short
      - tiny
    - bodyParser
    - cookieParser
      - req.cookies
    - session 必须先引入cookieParser
    - redis session
      - require('connect-redis')(connect)
    - methodOverride() 模拟请求方式_method=PUT
    - basicAuth 验证界面
- chapter9 Express
  - get put post del patch head
  - res.render
  - app.set
    - view engine
    - views 视图文件夹
    - view options {layout:false}
  - app.get 设置路由
  - `app.configure('production',function(){app.enable('view cache')})`-->   NODE_ENV = production node server 默认development
  - JSONP ?callback=myCallback
  - req
    - header('Host')大小写不敏感
    - accepts('html或text/html')
    - is('json text/html')
  - res
    - header('content-type'),设置header('content-type','application/json')
    - render
    - send
      - 状态码
      - HTML内容
      - object/array
    - json 跟send一样,显示使用json格式而已
    - redirect(url,302)
      - header('Location', url);
      - send(302)
      writeHead(302, {'Location': url});
      sendfile('image.png')
  - 路由
    - /post/:name req.params.name :name 加问号可选
- chapter10 WebSocket
  - ajax 无法控制服务器接收的顺序
  - ws = new WebSocket('ws://host/path') (wsio = require('websocket.io') ws = wsio.attach(app))
    - ws.onopen
    - ws.onclose
    - ws.ondata
  - 属于H5,早期浏览器可使用socket.io
- chapter11 socket.io
  - 跟websocket的区别是如果websocket不支持会自动进行降级,采用long polling方式
  - 基于传输而非websocket
  - connect disconnect
  - 命名空间 多路传输 频道切分 
    - io.of('/some/namespace').on('connection')
  - 事件
    - socket.on('event')
    - socket.emit('event')

## 数据库

- chapter12 MongoDB
- chapter13 MySQL
- chapter14 Redis
  - 支持数据类型 非关系型数据库
    - string
      - SET
      - INCR
      - DECR
    - list
      - RPUSH
      - LPUSH
      - LRANGE
    - set
      - SADD
      - SMEMBERS
      - SREM
    - hash
      - HSET
      - HGETALL
      - HDEL
      - HEXISTS
    - sorted set(有序数据集)


## 测试

- chapter15 代码共享
  - 服务器与了浏览器
    - 导出模块 window.add = module.exports
    - 扩展原型Function.prototype.bind = function(){}
    - 工具函数
    `let keys = Object.keys || function(obj) {var ret = {}; for (var i in obj) {if (Object.prototype.hasOwnProperty.call(obj,i)){ret.push(i)}}}`
    - 模拟实现API
      - EventEmitter
      - assert
    - 模拟实现浏览器API
      - XMLHttpRequest
      - DOM
      - WebSocket
      - node-canvas
    - browserbuild
- chapter16 测试
  - assert.ok
  - expect
    - assert.ok() = expect(res.text).to.contain()
    - expect().to.be/equal
    - expect().to.qul 非严格相等
    - expect().to.be.a('number')/an('array')
    - expect().to.match()
    - expect().to.have.length()
    - expect().to.be.empty()
    - expect().to.have.property()
    - expect().to.(only.)have.key()
    - expect().to.throwException()
    - expect().to.be.within(0, Infinity)
    - expect().to.be.above/greaterThan()
    - expect().to.be.below/lessThan
  - Mocha
    - describe('description', function() {it('description',function(done) {setTimeout(function(){done();}, 200)}})-->done用于测试异步代码
    - BDD behavior driven development
    - TDD test driven development
      - suite
      - suiteSetup
      - suiteSeardown
    - export



