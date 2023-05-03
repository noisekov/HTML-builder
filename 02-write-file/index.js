const path = require('node:path');
const fs = require('fs');

const file = path.join(__dirname, 'yourText.txt');

let readableStream = fs.createWriteStream(file, 'utf-8');
console.log('Write your message:');

process.stdin.on('data', data => {

  if (`${data.toString()}`.trim() == 'exit') {
    console.log('Good luck!');
    process.exit();
  } else {
    readableStream.write(`${data.toString()}`);
  }

});

process.on('SIGINT', () => {
  console.log('Good luck!');
  process.exit();
});
