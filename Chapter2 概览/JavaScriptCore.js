// 基本类型
var a = 1;
var b = a;
b = 6;
a;// 1;
b;// 6;

// 引用类型
var a = [1, 2, 3];
var b = a;
b[0] = 2;
a[0]; // 2
b[0]; // 2

// 特殊的类型
typeof null; // object
Object.prototype.toString.call([]);// '[object Array]'

//函数
var a = function() {}
console.log(a);

var b = function a() {};
typeof b;// 'function'
typeof a;// 'undefined'

//this
function a () {
  windows === this;// true
}

function a (a,b,c,d) {
  this.a === 'b';
}
a.length = 4
a.call({a: 'b'},a,b,c,d);
a.apply({a:'b'},[a,b,c,d])

// 闭包
var a = 5;
function foo () {
  a = 1;
  function bar () {
    a === 1;// true
    var b = 2;
  }
  b;// undefined
}

// IIFE
(function() {
  var a = 1;
}());
a;// undefined

// 类
function Animal(name){
  this.name = name;// 静态属性
};
Animal.prototype.eat = function(food){console.log(this.name + food);};// 方法
Animal.prototype.getName = () => this.name;

// 继承
function Ferret (){this.name = 'Ferret'};
Ferret.prototype = new Animal();
// 新增
Ferret.prototype.type = 'domestic';
// 重写
Ferret.prototype.eat.call(this,food);

// instanceof
var animal = new Animal();
animal instanceof Animal; // true;
animal instanceof Ferret; // false;

var ferret = new Ferret();
ferret instanceof Animal;// true
ferret instanceof Ferret;// false

// 使用__proto__,最清真.
Ferret.prototype.__proto__ = Animal.prototype;

// V8特性
// Object
var a = {a: 'b', c: 'd'};
for (var i in a) {};
Object.prototype.c = 'd';
for (var i in a) {
  if (a.hasOwnProperty(i)) {}
};
Object.keys(a);// ['a', 'c']

// Array
Array.isArray([]);
Array.isArray(null);// false

[1, 2, 3].forEach(a => {});
[1, 2, 3].filter((a) => a > 2);
[1, 2, 3].map((a) => a + 1);
[1, 2, 3].reduce((a, b) => a + b);
[1, 2, 3].reduceRight((a,b) => a - b);
[1, 2, 3].lastIndexOf(1)// 0 返回最后一个的索引

// String
'      1234'.trim();

// JSON
var obj = JSON.parse('{"a":"b"}'); // JSON --> obj
JSON.stringify(obj); // obj --> JSON

/// BIND
function a() {
  console.log(this.hello === 'world');
}
var b = {hello: "world"};
c = a.bind(b); // 注意跟apply,call的区别,不会立即调用.跟$.proxy比较类似
c();// true
a(); // false

function d() {
  console.log(this.hello === 'world');
}
d.apply({hello:"world"}); // true 立即调用
d();// false

var b = function d() {};
b.name = 'd';// 用于错误的堆栈追踪

// 存取器__defineGetter__ , __defineSetter__
Date.prototype.__defineGetter__('ago', function() {
  let diff = ((new Date()).getTime() - this.getTime()) / 1000; // 秒
  let dayDiff = Math.floor(diff / 86400);
  return dayDiff == 0 && (
    diff < 60 && "just now" || diff < 120 && "2 minites ago" || diff <3600 && "one hour ago" || diff < 7200 && "2 hours ago"
   );// 注意这里的&& 和 || 来短路使用起到的判断的效果
})
