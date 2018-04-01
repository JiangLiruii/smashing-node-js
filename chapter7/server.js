let http = require('http');
let qs = require('querystring');
http.createServer((req, res) => {
  if ('/' === req.url) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(
      `<form method="POST" action="/url">
      <h1>My form<h1>
      <fieldset><legend>Personal information</legend>
      <p>what is your name:</p>
      <input type="text" name="name"/>
      <p><button>Submit</button></p>
      </form>`
    );
  } else if('/url' === req.url && req.method === 'POST') {
    var body = '';
    req.on('data',(chunk) => {body += chunk});
    req.on('end', () => {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(`you sent one ${req.method} request, content is ${qs.parse(body).name}`);
    })
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }

}).listen(3000);