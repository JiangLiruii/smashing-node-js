// 单次请求,轮询,长轮询,websocket

// 如果使用ajax请求会使每一次的请求有很多无用的头信息,甚至超过请求数据本身.

// websocket是一个web下的TCP ,底层双向的socket, 运行用户对消息进行控制

// 包含两个部分,一个浏览器实现的API, 一个服务器端实现的websocket协议,

// 与HTTP的唯一区别就是在建立握手之后,客户端和服务端就建立了类似TCPWebsockt这样的通道

let ws = new WebSocket('ws://host/path');
ws.onopen = function() {
    ws.send('data');
};
ws.onclose = function() {};
ws.ondata = (ev) => {
    alert(ev.data);
};

