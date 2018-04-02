/**
 * GET /secret HTTP/1.1
 * Host: www.mywebsite.org
 * Cookie:secret1=value1;secret2=value2;
 * Accept:
 */


let conn = require('connect');
let server = conn(connet.cookieParser());
server.use((req, res, next) => {
    req.cookies.secret1 = 'value1';
    req.cookies.secret2 = 'value2';    
});

