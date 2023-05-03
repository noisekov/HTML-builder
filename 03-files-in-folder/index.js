const fs = require('fs');
const path = require('node:path');

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, {withFileTypes: true}, (_, files) => {

  for (let prop of files) {
    if (!prop.isDirectory()) {
      const nameFile = prop.name.split('.')[0];
      const extnameFile = path.extname(prop.name).replace('.', '');

      fs.stat(path.join(__dirname, `/secret-folder/${prop.name}`), (_, stats) => {
        console.log(`${nameFile} - ${extnameFile} - ${(stats.size / 1024).toFixed(3)}kb`);
      });
    }
  }

});
