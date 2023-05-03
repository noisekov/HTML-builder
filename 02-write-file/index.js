const path = require('node:path');
const fs = require('fs');

const file = path.join(__dirname, 'yourText.txt');

let readableStream = fs.createWriteStream(file, 'utf-8');
console.log('Write your message:');

process.stdin.on('data', data => {
  readableStream.write(`${data.toString()}`);

  if (`${data.toString()}`.trim() == 'exit') {
    console.log('Good luck!');
    process.exit();
  }

});

process.on('SIGINT', () => {
  console.log('Good luck!');
  process.exit();
});
