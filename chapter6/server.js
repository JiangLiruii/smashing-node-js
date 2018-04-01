let net = require('net');
let count = 0, user = {};
function broadcast(msg, exceptMyself) {
  for (let i in user) {
    if (!exceptMyself || i != nickname) {
      user[i].write(msg);
    }
  }
}
let server = net.createServer((conn) => {
  conn.setEncoding('utf8');
  let nickname;
  // conn.write(
  //   'new connection     ' + count + ' exists'
  // )
  broadcast('new connection     ' + count + ' exists');
  
  conn.on('close', ()=>{ // close 包含end 如果是error退出不会触发end,但会触发close
    count -= 1;
    delete(user[nickname]);
    broadcast(nickname + 'left the room');
  })
  conn.on('data', function(data) {
    if (!nickname) {
      if (user[data]) {
        console.log('already use');
        return;
      } else {
        nickname = data;
        user[nickname] = conn;
      }
      for (let i in user) {
        console.log(`${i} joins chat room`);
      }
    } else {
      // for (let i in user) {
      //   if (nickname !== i) {
      //     user[i].write(`${nickname} send something`); // 只发送除自己外的客户端;
      //   };
      broadcast(`${nickname} send something`, true);
      
    }
  })
  count += 1; 
});
server.listen(3000,function() {
  console.log('listenning on 3000');  
})