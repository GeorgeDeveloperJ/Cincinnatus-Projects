const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config.json');

class File {
  constructor(name, extension) {
    this.name = name;
    this.extension = extension;
  }
  getCategory() {
    return config[this.extension] || "Others";
  }
}

const homeDir = os.homedir();
const defaultDownloadsPath = path.join(homeDir, 'Downloads');

let dir = process.argv[2] ?? defaultDownloadsPath;

if (dir === defaultDownloadsPath) {
  console.log("No dir was provided!");
  console.log("Using download dir as default");
} else {
  dir = path.join(homeDir, dir)
}

console.log(`Sorting ${dir}...`);

const dirContent = fs.readdirSync(dir, { withFileTypes: true })

for (let i = 0; i < dirContent.length; i++) {
  let item = dirContent[i];

  if (item.isFile()) {
    const parsedFile = path.parse(item.name);
    const file = new File(parsedFile.name, parsedFile.ext)

    const categoryFolder = path.join(dir, file.getCategory());
    const originalFilePath = path.join(dir, item.name);
    let newFilePath = path.join(categoryFolder, item.name );

    const existsDir = fs.existsSync(categoryFolder);

    if (!existsDir) {
      fs.mkdirSync(categoryFolder);
    }

    const existsFile = fs.existsSync(newFilePath);
    if (existsFile) {
      newFilePath = manageRepeated(newFilePath);
    } 

    fs.renameSync(originalFilePath, newFilePath); 
  } else {
    console.log(`Skipped folder ${item.name}`)
  }
}

console.log(`${dir} sorted succesfully`);