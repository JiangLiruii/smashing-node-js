let qs = require('querystring'),
    http = require('http');
    
let search = process.argv.slice(2).join(' ').trim();
if(!search.length) {
    return console.log('\n Usage: node tweets <search terms> \n');
}
console.log('\n searching for ' + search + '\n');
http.request({
    host: 'search.twitter.com',
    path: '/search.json?' + qs.stringify({q: search})
}, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        let obj = JSON.parse(body); // 将json格式字符串转换为对象
        obj.results.forEach((tweet) => {
            console.log(tweet.text);
            console.log(tweet.from_user);
            console.log('--');
        })
    })
}).end(); // 主动调用end, 服务端才能响应req.on('end')

// 使用get方法重写
http.get({
    host: 'search.twitter.com',
    path: '/search.json?' + qs.stringify({q: search})
},(res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        let obj = JSON.parse(body); // 将json格式字符串转换为对象
        obj.results.forEach((tweet) => {
            console.log(tweet.text);
            console.log(tweet.from_user);
            console.log('--');
        })
    })
});// 无需再次调用end了,更高效,因为API会接受一个method的参数

// superagent
// 客户端共性: 获取所有响应数据,Content-Type进行数据解析;
let request = require('superagent');
request.get('http://twitter.com/search.json')
.send({q:'justin bieber'})
.set('Date', new Date)
.end((res) => {
    console.log(res.body);
})

// post
request.post('http://twitter.com/search.json')
.send({json: 'encode'})
.end();

