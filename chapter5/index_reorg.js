let fs = require('fs'),
    stdout = process.stdout,
    stdin = process.stdin;

function file(i) {
  let filename = file[i], stats = [];
  fs.stat(__dirname + '/' + filename, function(err, stat) {
    if (stat.isDirectory) {
      stats[i] = stat;
      console.log('     ' + files.lastIndexOf(filename) + '\033[36m' + filename + '\033[39m');
    } else {
      console.log('     ' + files.lastIndexOf(filename) + '\033[90m' + filename + '\033[39m')
    }
    if (++ i === file.length) {
      read();
    } else {
      file(i);
    }
  });
};
function read() {
  console.log('');
  stdout.write('enter your choice:');
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', option);
};
function option(data) {
  let filename = files(Number(data));
  if (filename) {
    stdout.write('enter your choice');
  } else {
    stdin.pause();
    // fs.readFile(__dirname + '/' + filename, 'utf8',(err, data) => {
    //   console.log('');
    //   console.log(date.replace(/(.*)/g,'$1'));
    // })
    if (stats[Number(data).isDirectory]) {
      fs.readdir(__dirname + '/' + filename, (err, data) => {
        console.log('');
        console.log(data.length + 'files');
        data.forEach((file) => {
          console.log('---' + file);
        })
        console.log('');
      })
    } else {
      fs.readFile(__dirname + '/' + filename, 'utf8',(err, data) => {
        console.log('');
        console.log(date.replace(/(.*)/g,'$1'));
      })
    }
  }
}


