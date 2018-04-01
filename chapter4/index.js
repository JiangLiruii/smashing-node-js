let a = require('./module_a');
console.log(a.name);
console.log(a.data);
console.log(a.pribateVariable());

let Person = require('./person');
let mike = new Person('Mike');
console.log(mike.talk());