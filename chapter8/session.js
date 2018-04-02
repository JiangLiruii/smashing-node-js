let connect = require('connect');
let users = require('./user');
let server = connect(connect.logger('dev'), connect.bodyParser(), connect.cookieParser(), connect.session({secret: 'my app secret'}), (req, res, next) => {
    if(req.url === '/' && req.session.logged_in) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end('welcome <b>' + res.session.name + '</b> <a href="/logout">Logout</a>')
    } else {
        next();
    }
},(req, res, next) => {
    if('/'=== req.url && 'GET' === req.method) {
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(`<form action='/login' method='POST'><fieldset><legend>please log in</legend>
                <p>User:<input type='text' name='user'></p>
                <p>password:<input type='password' name='password'></p>
                <button type='submit'>Submit</button>
                </fieldset>
                </form>`)
    } else {
        next();
    }
}, (req, res, next) => {
    if('/login' === req.url && 'POST' === req.method) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        if(!users[req.body.user] || req.body.password != users[req.body.user].password){
            res.end('bad username/password')
        } else {
            req.session.logged_in = true;
            req.session.name = users[req.body.user].name;
            res.end('Athenticated <a href="/logout">Logout</a>')
        }
    } else {
        next();
    }
},(req, res, next) => {
    if('/logout' === req.url) {
        req.session.logged_in = false;
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end('Logged Out <a href="/">Login</a>');
    } else {
        next();
    }
}).listen(3000);

// redis
let connect = require('connect');
let RedisStore = require('connect-redis')(connect)
server.use(connect.session({store:new RedisStore, secret: 'my secret'}));
