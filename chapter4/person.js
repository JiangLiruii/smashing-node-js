module.exports = Person;
function Person (name) {
  this.nickname = name;
}
Person.prototype.talk = function() {
  console.log(this.nickname);
}