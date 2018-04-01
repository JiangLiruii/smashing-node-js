// http.Server继承自net.Server net为TVP模块

// IP协议:无连接,基于数据报,无序
// TCP 首要特性:面向连接,有序(在数据信息中包含标识该链接以及数据流顺序的信息)
// 面向字节:对字符编码没有要求,但不同的编码有不同的字节数
// 可靠性 数据发送后需要获取确认消息(如果未收到,会在时间窗口之后进行重发)
// 流控制: 平衡两点之间的数据平衡
// 拥堵控制: 确保QoS(quality of service) 控制数据包的延迟率和丢包率不会很高
// telnet: 双向虚拟终端(如果客户端未使用telnet, 会自动降级到tcp)
require('http').createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>hello world</h1>');
}).listen(3000);

