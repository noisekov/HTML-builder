const fs = require('fs');
const path = require('path');

const pathToFolderStyle = path.join(__dirname, '/styles');

function callback() {
  console.log('bundle создан');
}

let allStyles = [];
fs.readdir(pathToFolderStyle, { withFileTypes:true } , (_, files) => {
  for (let prop of files) {
    // check that it isnt folder
    if (!prop.isDirectory()) {
      // if file extension css ..
      if (prop.name.split('.')[1] === 'css') {
        // fs.readFile(path.join(__dirname, /styles/${prop.name}), 'UTF-8', function (error, fileContent) {
        //     allStyles.push(fileContent)
        // })
        const stream = new fs.ReadStream(path.join(__dirname, `/styles/${prop.name}`), 'UTF-8');

        stream.on('readable', function () {
          while ((data = this.read()) !== null) {
            allStyles.push(data);
            console.log(allStyles)
          }
        })
      }
    }
  }
})
fs.writeFile(path.join(__dirname, '/project-dist/bundle.css'), '', 'utf8', callback);