const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, '/files');
const pathToTask = path.join(__dirname, 'files-copy');

try {
  fs.access(pathToTask, async (isExist) => {
    if (`${isExist ? false : true}` === 'true') {
      await fs.promises.rm(pathToTask, { recursive: true });
    }
    await fs.promises.mkdir(pathToTask, { recursive: true });

    fs.readdir(pathToFolder, (_, files) => {
      files.forEach((file) => {
        const callback = (err) => {
          if (err) throw err;
        };

        fs.copyFile(pathToFolder + `/${file}`, pathToTask + `/${file}`, callback);
      });
    });
  });
} catch (err) {
  console.error(err);
}
