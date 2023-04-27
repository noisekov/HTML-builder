const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, '/files');
const pathToTask = path.join(__dirname, 'files-copy');

fs.mkdir(pathToTask, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(pathToFolder, (_, files) => {
  files.forEach((file) => {
    fs.copyFile(pathToFolder + `/${file}`, pathToTask + `/${file}`, callback);

    function callback(err) {
      if (err) throw err;
      console.log(`Файл ${file} успешно скопирован в папку files-copy.`);
    }
  })
})
