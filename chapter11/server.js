let express = require('express'), 
    sio = require('socket.io'), 
    request = require('superagent'),
    dj, currentSong,
    app = express.createServer(express.bodyParser(),express.static('public'));
app.listen(3000);
let io = sio.listen(app);
function elect(socket) {
    dj = socket;
    io.sockets.emit('announcement', socket.nickname + 'is the new dj');
    socket.dj = true;
    socket.emit('elected');
    socket.on('disconnect', function() {
        dj = null;
        console.log('已退出');
        io.sockets.emit('announcement', "dj left,the next one join will be new dj")
    })
}
io.sockets.on('connection', function(socket) { // 自定义api
    console.log('someone connected');
    socket.on('join', (name) => {
        socket.nickname = name;
        // 广播给除自己意外的所有人
        socket.broadcast.emit('announcement', name + 'join the chat');
        if (!dj) {
            elect(socket);
        } else {
            socket.emit('song',currentSong)
        }
    });

    socket.on('text', (value, fn) => {
        socket.broadcast.emit('text', socket.nickname, value);
        fn(Date.now());
    });

    socket.on('search', function(q, fn) {
        request('http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword='+ encodeURIComponent(q) + '&page=1&pagesize=90&showtype=2',
        function(res) {
            console.log(res.status,JSON.parse(res.text).data.info);
            if(res.status === 200) {
                fn(JSON.parse(res.text).data.info);
            }
        })
    });

    socket.on('song', function(song) {
        if (socket.dj) {
            function songEmit(res) {
                let ress = JSON.parse(res.text);
                currentSong.play_url = ress['data']['play_url'];
                currentSong.image_url = ress['data']['img'];
                console.log('这是song', "这是ress", song.play_url, song.image_url);
                io.sockets.emit('song', currentSong);
            }
            currentSong = song;
            // 无损音质
            if (currentSong['320hash']) {
                request('http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + currentSong['320hash'],songEmit)
            } else {
                request('http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + currentSong['hash'],songEmit);
            }
        }
    })
}); 