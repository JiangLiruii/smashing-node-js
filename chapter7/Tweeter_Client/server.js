let http = require('http');
let qs = require('querystring')
http.createServer((req, res) => {
  let body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {
    res.writeHead(200);
    res.end('done');
    console.log(qs.parse(body).name);
  });
}).listen(3000);
