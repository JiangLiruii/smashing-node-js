let mybuffer = new Buffer('sadasddda','base64');
console.log(mybuffer);
require('fs').writeFile('logo.png', mybuffer);