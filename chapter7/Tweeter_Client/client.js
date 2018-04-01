let http = require('http');
let qs = require('querystring');
function send (theName) {
  http.request({
    host: '127.0.0.1',
    port: 3000,
    url: '/',
    method: 'GET'
  }, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', ()=>{
      process.stdout.write('your name:')
      console.log(`we got ${body}`);
    })
  }).end(qs.stringify({'name': theName}));
}
process.stdout.write('your name:');
process.stdin.resume();process.stdin.setEncoding('utf8');
process.stdin.on('data', function(name) {
  send(name.replace('\n',''));
})
