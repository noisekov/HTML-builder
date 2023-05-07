const fs = require('fs');
const path = require('path');

const pathToFolderStyle = path.join(__dirname, '/styles');

const readableStream = fs.createWriteStream(path.join(__dirname, '/project-dist/bundle.css'), 'utf8');

fs.readdir(pathToFolderStyle, { withFileTypes:true } , (_, files) => {
  for (let prop of files) {
    if (!prop.isDirectory()) {
      if (path.extname(prop.name) === '.css') {
        const stream = new fs.ReadStream(path.join(__dirname, `/styles/${prop.name}`), 'UTF-8');

        stream.on('data', (chunk) => readableStream.write(chunk));
      }
    }
  }
});
