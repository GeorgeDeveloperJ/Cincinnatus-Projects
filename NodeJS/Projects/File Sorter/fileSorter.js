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
    const fileName = item.name;
    const extension = path.extname(fileName);
    const file = new File(path.basename(fileName, extension), extension);
    
    const categoryFolder = path.join(dir, file.getCategory());
    const originalFilePath = path.join(dir, fileName);
    const newFilePath = path.join(categoryFolder, fileName);

    const existsDir = fs.existsSync(categoryFolder);

    if (!existsDir) {
      fs.mkdirSync(categoryFolder);
    } 
    fs.renameSync(originalFilePath, newFilePath);
  }
}
