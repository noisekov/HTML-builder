const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, '/files');
const pathToTask = path.join(__dirname, 'files-copy');

fs.mkdir(pathToTask, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(pathToTask, (_, files) => {
  files.forEach((file) => {
    fs.unlink(`${pathToTask}/${file}`, err => {
      if(err) throw err;
    });
  });
});

fs.readdir(pathToFolder, (_, files) => {
  files.forEach((file) => {
    const callback = (err) => {
      if (err) throw err;
    };

    fs.copyFile(pathToFolder + `/${file}`, pathToTask + `/${file}`, callback);
  });
});
