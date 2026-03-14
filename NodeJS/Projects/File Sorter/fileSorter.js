import os from 'node:os';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const defaultConfig = {
        ".pdf": "Documents",
        ".docx": "Documents",
        ".xlsx": "Documents",
        ".txt": "Documents",
        ".csv": "Documents",
  
        ".mp4": "Media",
        ".mkv": "Media",
        ".avi": "Media",
        ".mp3": "Media",
  
        ".jpg": "Images",
        ".jpeg": "Images",
        ".png": "Images",
        ".svg": "Images",
  
        ".js": "Code",
        ".json": "Code",
        ".html": "Code",
        ".css": "Code",
        ".py": "Code",
        ".sh": "Code",
      
        ".zip": "Archives",
        ".tar.gz": "Archives",
        ".rar": "Archives",
        ".7z": "Archives",
        
        ".iso": "OS_Images",
        ".img": "OS_Images",
        ".rpm": "OS_Images",
        ".deb": "OS_Images",
        
        ".pcap": "Security",
        ".ovpn": "Security",
        ".pem": "Security",
        
        ".torrent": "Torrents"

      }

function manageRepeated(filePath) {
  const parsed = path.parse(filePath);

  let counter = 1;
  let newPath = path.join(parsed.dir, `${parsed.name}(${counter})${parsed.ext}`);

  while (existsSync(newPath)) {
    counter++;
    newPath = path.join(parsed.dir, `${parsed.name}(${counter})${parsed.ext}`);
  }

  return newPath;
}
class File {
  constructor(name, extension) {
    this.name = name;
    this.extension = extension;
  }
  getCategory(config) {
    return config[this.extension] || "Others";
  }
}

async function getConfig() {
  try {
    const configFile = await fs.readFile('./config.json', 'utf-8');
    return JSON.parse(configFile);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile('./config.json', JSON.stringify(defaultConfig));
      return defaultConfig;
    } else {
     console.error(`Error during reading the config ${err}`) ;
    }
  }
}

async function sortFiles(config) {
  
  try {
  const homeDir = os.homedir();
  const defaultDownloadsPath = path.join(homeDir, 'Downloads');

  let dir = process.argv[2] ?? defaultDownloadsPath;

  if (dir === defaultDownloadsPath) {
    console.log("No dir was provided!");
    console.log("Using download dir as default");
  } else {
    dir = path.resolve(homeDir, dir)
  }

  console.log(`Sorting ${dir}...`);

  const dirContent = await fs.readdir(dir, { withFileTypes: true })
  const createdFolders = new Set();

  for (const item of dirContent) {

    if (item.isFile()) {
      const parsedFile = path.parse(item.name);
      const file = new File(parsedFile.name, parsedFile.ext)

      const categoryFolder = path.join(dir, file.getCategory(config));
      const originalFilePath = path.join(dir, item.name);
      let newFilePath = path.join(categoryFolder, item.name );

      if (!createdFolders.has(categoryFolder)) {
        await fs.mkdir(categoryFolder, { recursive: true });
        createdFolders.add(categoryFolder);
      }
      

      const existsFile = existsSync(newFilePath);
      if (existsFile) {
        newFilePath = manageRepeated(newFilePath);
      } 

      await fs.rename(originalFilePath, newFilePath); 
    } else {
      console.log(`Skipped folder ${item.name}`)
    }
  }

  console.log(`${dir} sorted succesfully`);
  } catch (err) {
    console.error(`Error during the execution`, err);
  }

}

async function main() {
  const config = await getConfig();
  await sortFiles(config);
}

main();