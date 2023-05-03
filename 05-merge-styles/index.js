const fs = require('fs');
const path = require('path');

const pathToFolderStyle = path.join(__dirname, '/styles');

let readableStream = fs.createWriteStream(path.join(__dirname, '/project-dist/bundle.css'), 'utf8');

fs.readdir(pathToFolderStyle, { withFileTypes:true } , (_, files) => {
  for (let prop of files) {
    if (!prop.isDirectory()) {
      if (path.extname(prop.name) === '.css') {
        const stream = new fs.ReadStream(path.join(__dirname, `/styles/${prop.name}`), 'UTF-8');

        stream.on('readable', function () {
          while ((data = this.read()) !== null) {
            readableStream.write(data);
          }
        })

      }
    }
  }
})
