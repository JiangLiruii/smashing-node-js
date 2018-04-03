let express = require('express'),
    wsio = require('websocket.io');
let total = 0, position = {};
let app = new express.createServer();
ws = wsio.attach(app);
app.use(express.static('public'));
ws.on('connection', (socket) => {
    socket.id = ++ total;
    // socket.on('message', (msg) => {
    //     console.log('got', msg);
    //     socket.send('pong');
    // })
    socket.send(JSON.stringify(position));
    socket.on('message', (msg) => {
        try {
            let pos = JSON.parse(msg);
            position[socket.id] = pos;
            console.log(pos,socket.id);
            broadcast(JSON.stringify({type:'position', pos: pos, id:socket.id}));
        } catch (e) {
            console.log(e);
            return;
        }
    });
    socket.on('close', () => {
        delete position[socket.id];
        broadcast(JSON.stringify({type:'disconnect', id:socket.id}));
    });
    function broadcast (msg) {
        for (let i =0, max = ws.clients.length; i< max; i += 1) {
            if (ws.clients[i]) {
                ws.clients[i].send(msg);
            }
        }
   }
});

app.listen(3000);
