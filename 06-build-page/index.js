const path = require('path');
const fs = require('fs');

const pathToFolder = path.join(__dirname, 'project-dist');
const pathToFolderStyle = path.join(__dirname, 'styles');
const pathToFolderAssets = path.join(__dirname, 'assets');

//copy style
fs.mkdir(pathToFolder, { recursive: true },  err => {
  if(err) throw err;
});

let readableStream = fs.createWriteStream(path.join(pathToFolder, 'style.css'), 'utf8');

fs.readdir(pathToFolderStyle, { withFileTypes:true } , (_, files) => {
  for (let prop of files) {
    const stream = new fs.ReadStream(path.join(__dirname, `/styles/${prop.name}`), 'UTF-8');

    stream.on('data', (chunk) => readableStream.write(chunk));
  }
});

//copy components
fs.mkdir(path.join(pathToFolder, '/assets'), { recursive: true },  err => {
  if(err) throw err;
});

fs.mkdir(`${pathToFolder}/assets/img`, { recursive: true },  err => {
  if(err) throw err;
});

fs.mkdir(`${pathToFolder}/assets/fonts`, { recursive: true },  err => {
  if(err) throw err;
});

fs.mkdir(`${pathToFolder}/assets/svg`, { recursive: true },  err => {
  if(err) throw err;
});


fs.readdir(pathToFolderAssets + '/fonts', (_, files) => {
  files.forEach(file => {
    const cb = (err) => {
      if (err) throw err;
    };

    fs.copyFile(`${pathToFolderAssets}/fonts/${file}`, `${pathToFolder}/assets/fonts/${file}`, cb);
  });
});
fs.readdir(pathToFolderAssets + '/img', (_, files) => {
  files.forEach(file => {
    const cb = (err) => {
      if (err) throw err;
    };

    fs.copyFile(`${pathToFolderAssets}/img/${file}`, `${pathToFolder}/assets/img/${file}`, cb);
  });
});
fs.readdir(pathToFolderAssets + '/svg', (_, files) => {
  files.forEach(file => {
    const cb = (err) => {
      if (err) throw err;
    };

    fs.copyFile(`${pathToFolderAssets}/svg/${file}`, `${pathToFolder}/assets/svg/${file}`, cb);

  });
});

//work with template file
const readTemplate = () => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(path.join(__dirname, 'template.html'), 'UTF-8');
    let template = '';

    stream.on('data', (chunk) => template += chunk.toString());
    stream.on('end', () => resolve(template));
    stream.on('error', (err) => reject(err));
  });
};

const changeValueTemplate = async () => {
  try {
    let template = await readTemplate();

    fs.readdir(path.join(__dirname, '/components/'), (_, files) => {
      files.forEach(file => {
        const streamRead = fs.createReadStream(path.join(__dirname, `/components/${file}`), 'UTF-8');
        const streamWrite = fs.createWriteStream(path.join(pathToFolder, 'index.html'), 'UTF-8');
        const currentTemplate = `{{${file.split('.')[0]}}}`;

        let dataChunk = '';
        streamRead.on('data', chunk => dataChunk += chunk);
        streamRead.on('end', () => {
          template = template.replace(currentTemplate, dataChunk);
          streamWrite.write(template);
        });
      });
    });
  } catch (err) {
    console.log(err);
  }

};
changeValueTemplate();
