let path = require('path')
let fs = require('fs');
// fs.readdir(__dirname, function(err, files) {
//   if (!err) {
//     console.log(files);
//   }
// });

fs.readdir(process.cwd(), function(err, files) {
  console.log('');
  if (!files.length) {
    return console.log('    \033[31m No files to show\033[39m\n');
  }
  console.log('    Select file');
 
  function file(filename, files){
      fs.stat(__dirname +'/' + filename, function(err,stat) {
      if (stat.isDirectory) {
        console.log('     ' + files.lastIndexOf(filename) + '\033[36m' + filename + '\033[39m');
      } else {
        console.log('     ' + files.lastIndexOf(filename) + '\033[90m' + filename + '\033[39m')
      }
    })
  }
  console.log(files);
  files.forEach((filename) => file(filename, files));
  console.log('');
  process.stdout.write('\033[33m Enter your filename\033[39m');
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
});
