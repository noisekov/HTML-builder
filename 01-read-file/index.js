const fs = require('fs');
const stream = new fs.ReadStream('./01-read-file/text.txt', 'UTF-8');

stream.on('readable', function () {
   while ((data = this.read()) !== null) {
      console.log(data);
   }
})