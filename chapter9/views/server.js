let express = require('express');
let search = require('./search');
let app = express.createServer();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout:false});
// 支持的方法:get,put,post, patch, del, head
// app.get('/', (req, res, next) => {})
// app.put('/post/:name', (req, res, next) => {});
// app/post('signup', (req, res, next) => {});
// app.del('/user/:id', (req, res, next) => {});
// app.patch('/user/:id', (req, res, next) => {});
// app.head('/user/:id', (req, res, next) => {})
app.get('/', (req, res) => {
    res.render('index');
});
app.listen(3000);