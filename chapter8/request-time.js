module.exports = (opts) => {
    let time = opts.time || 100;
    return function(req, res, next) {
        let timer = setTimeout(() => {
            console.log('long time', req.method, req.url);
        }, time);
        let end = res.end; // 保存原有函数的引用
        res.end = (chunk,encoding) =>{
            res.end = end; // 回复原有的引用
            res.end(chunk,encoding); // 调用
            clearTimeout(timer); // 清除计时器
        };
        next();
    };
}