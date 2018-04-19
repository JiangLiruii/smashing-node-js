let express = require('express'), 
    sio = require('socket.io'), 
    request = require('superagent'),
    path = require('path'),
    dj, currentSong,
    app = express.createServer(express.bodyParser());
app.use(express.static(__dirname + '/views'))
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
        request('http://songsearch.kugou.com/song_search_v2?keyword='+ encodeURI(q) + '&userid=admin&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0',
        function(res) {
            console.log('====================================');
            console.log(res.status,JSON.parse(res.text).data);
            console.log('====================================');
            if(res.status === 200) {
                // let a = res.text;
                // let c = JSON.parse(a);
                // fn(c.data.lists);
                fn(JSON.parse(res.text).data.lists)
            }
        })
    });

    socket.on('song', function(song) {
        if (socket.dj) {
            function songEmit(res) {
                let ress = JSON.parse(res.text);
                currentSong.play_url = ress['data']['play_url'];
                currentSong.image_url = ress['data']['img'];
                // console.log('这是song', "这是ress", song.play_url, song.image_url);
                io.sockets.emit('song', currentSong);
            }
            currentSong = song;
            // 无损音质
            // if (currentSong['SQFileHash'] > 0) {
            //     request('http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + currentSong['SQFileHash'],songEmit)
            // } else if (currentSong['ResFileHash']) {
            //     request('http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + currentSong['ResFileHash'],songEmit);
            // } else if (currentSong['HQFileHash']) {
            //     request('http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + currentSong['HQFileHash'],songEmit);
            // }else if (currentSong['FileHash']) {
            //     request('http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + currentSong['FileHash'],songEmit);
            // } else{
            //     console.error('no file available')
            // }
            if (currentSong['FileHash']) {
                    request('http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + currentSong['FileHash'],songEmit);
                }
        }
    })
}); 