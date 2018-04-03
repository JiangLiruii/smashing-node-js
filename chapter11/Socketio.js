// 典型web通信方式是通过HTTP收取或发送文档, 但是实时web世界中,均是基于事件传输

io.sockets.on('connection', (socket) => {
    socket.send('a');
    socket.on('message', (msg) => {
        console.log(msg)
    })
})

let socket = io.connect();
socket.on('position', move);
socket.on('remove',remove);