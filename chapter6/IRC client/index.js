let net = require('net');
let client = net.connect(6667,'irc.freenode.net',function(){
  client.write('NICK mynick\r\n');
  client.write('USER mynick 0 *:realname\r\n');
  client.write('JOIN #node.js\r\n');
});
client.setEncoding('utf8');


