let request = require('superagent');
module.exports = function search(query, fn) {
    request.get('http://search.twitter.com/search.json')
    .data({q:query})
    .end((res) => {
        if (res.body && Array.isArray(res.body.results)) {
            return fn(null, res.body.results);
        }
        fn(new Error ('bad response'));
    })
}