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

    stream.on('readable', function () {
      while ((data = this.read()) !== null) {
        readableStream.write(data);
      }
    })

  }
})

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
    fs.copyFile(`${pathToFolderAssets}/fonts/${file}`, `${pathToFolder}/assets/fonts/${file}`, cb);

    function cb(err) {
      if (err) throw err;
    }
  })
})
fs.readdir(pathToFolderAssets + '/img', (_, files) => {
  files.forEach(file => {
    fs.copyFile(`${pathToFolderAssets}/img/${file}`, `${pathToFolder}/assets/img/${file}`, cb);

    function cb(err) {
      if (err) throw err;
    }
  })
})
fs.readdir(pathToFolderAssets + '/svg', (_, files) => {
  files.forEach(file => {
    fs.copyFile(`${pathToFolderAssets}/svg/${file}`, `${pathToFolder}/assets/svg/${file}`, cb);

    function cb(err) {
      if (err) throw err;
    }
  })
})

//work with template file
const stream = new fs.ReadStream(path.join(__dirname, `template.html`), 'UTF-8');
const streamArticles = new fs.ReadStream(path.join(__dirname, `/components/articles.html`), 'UTF-8');
const streamFooter = new fs.ReadStream(path.join(__dirname, `/components/footer.html`), 'UTF-8');
const streamHeader = new fs.ReadStream(path.join(__dirname, `/components/header.html`), 'UTF-8');

let readable = fs.createWriteStream(`${pathToFolder}/index.html`, 'utf8');

stream.on('readable', function () {
  while ((data = this.read()) !== null) {
    // data.split('\n').forEach(findComponent => {
    //   if (findComponent.trim() === '{{articles}}') {
    //     console.log('articles заменить тут')
    //   }

    //   if (findComponent.trim() === '{{footer}}') {
    //     console.log('footer заменить тут')
    //   }

    //   if (findComponent.trim() === '{{header}}') {
    //     console.log('header заменить тут')
    //   }
    // })
    readable.write(data)
  }
})
