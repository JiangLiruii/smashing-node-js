window.onload = function() {
    let socket = io.connect();
    socket.on('connect', function() {
        socket.emit('join', prompt('what is your name'));
        document.getElementById('chat').style.display = 'block';
    });
    
    socket.on('announcement', (msg) => {
        let li = document.createElement('li');
        li.className = 'announcement';
        li.innerHTML = msg;
        document.getElementById('message').appendChild(li);
    });

    socket.on('text', addMessage);


    let input = document.getElementById('input');
    document.getElementById('form').onsubmit = function() {
        let li = addMessage('me', input.value)
        socket.emit('text', input.value, function(date) {
            li.className = 'confirm';
            li.title = date
        });
        input.value = '';
        input.focus();
        return false;
    }
    function addMessage(from, text) {
        let li = document.createElement('li');
        li.className = 'message';
        li.innerHTML = `<b>${from}</b> ${text}`;
        document.getElementById('message').appendChild(li);
        return li;
    }



    let form = document.getElementById('dj');
    let results = document.getElementById('results');
    
    form.onsubmit = function() {
        results.innerHTML = '';
        socket.emit('search', document.getElementById('s').value, function(songs) {
            for (let i = 0, max = songs.length; i< max; i += 1) {
                (function(song) {
                    let result = document.createElement('li');
                    result.innerHTML = song.singername + '   -<b>' + song.songname + '</b>'
                    let a = document.createElement('a');
                    a.innerHTML = '   select';
                    a.href = '#';
                    a.onclick = function() {
                        socket.emit('song', song);
                        play(song);
                        return false;
                    }
                    result.appendChild(a);
                    results.appendChild(result)
                }(songs[i]))
            }
        });
        return false;
    }
    socket.on('elected', function() {
        form.className = 'isDJ';
        form.style.display = 'block';
        
    })
    let playing = document.getElementById('playing');
    function play(song) {
        if(!song) return;
        playing.innerHTML = '<br><b>Now playing</b>' + song.singername + '  ' + song.songname + '</br>'
    }
    socket.on('song', play);
}