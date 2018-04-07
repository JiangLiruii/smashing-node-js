// 典型web通信方式是通过HTTP收取或发送文档, 但是实时web世界中,均是基于事件传输

// 事件

io.sockets.on('connection', (socket) => {
    socket.send('a');
    socket.on('message', (msg) => {
        console.log(msg)
    })
})

let socket = io.connect();
socket.on('position', move);
socket.on('remove',remove);

// 命名空间: 允许单个链接中利用命名空间来将消息彼此区分出来, 

io.sockets.on('connection');
io.of('/some/namespace').on('connection');
io.of('/some/other/namespace').on('connection');

// 只会使用一个传输通道

let socket = io.connect()
let socket1 = io.connect('/some/namespace');
let socket2 = io.connect('/some/other/namespace');
