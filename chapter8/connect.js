let http = require('http'),
    fs = require('fs');
function serve(res, url, type) {
    res.writeHead(200, {'Content-Type': type});
    fs.createReadStream(url).pipe(res);// fs 只读,http res只写
}
let server = http.createServer((req, res) => {
    if ('GET' === req.method && '/images' === req.url.substr(0,7) && '.jpg' === req.url.substr(-4) ) {
        fs.stat(__dirname + req.url, (err,stat) => {
            if (err || !stat.isFile) {
                res.writeHead(404);
                res.end('Not Found');
                return;
            } else {
                serve(res, __dirname + req.url, 'application/jpg')
            }
        });
    } else if ('GET' === req.method && '/' === req.url) {
        serve(res, __dirname + '/index.html', 'text/html');
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
    
}).listen(3000);


