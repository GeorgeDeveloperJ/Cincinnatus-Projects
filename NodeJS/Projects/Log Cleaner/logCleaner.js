import fs from "node:fs";
import zlib from "node:zlib";
import inquirer from "inquirer";
import path from "node:path";

async function getConfig() {
  if (!fs.existsSync("./config.json")) {
    try {
    const answers = await inquirer
      .prompt([
        {
          name: "absolutePath",
          message: "What is the absolute path to your log directory",
          default: "./logs",
        },
        {
          name: "threshold",
          type: "number",
          message: "How many days of logs do you want to keep?",
          default: 14,
        },
        {
          name: "fileType",
          message: "What file extension should we look for?",
          default: ".log",
        },
        {
          name: "action",
          message:
            "What should we do with the logs older than your threshold, delete or compress?",
          default: "compress",
        },
      ]);
      fs.writeFileSync("./config.json", JSON.stringify(answers));   
    } catch (error) {
      if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment");
      } else {
        console.error("Something went wrong", error);
      }
      process.exit(1);
    }
  }
  const configFile = fs.readFileSync("./config.json", "utf-8");
  return JSON.parse(configFile);
}

function compressFile(originalPath, timestamp, file) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(originalPath);
    const writeStream = fs.createWriteStream(originalPath + "-" + timestamp + ".gz");
    const gzip = zlib.createGzip();

    readStream.on('error', error => {
      reject(new Error(`Error during reading ${file}: ${error.message}`));
    });

    writeStream.on('error', error => {
      reject(new Error(`Error during writing ${file}: ${error.message}`));
    });

    readStream.pipe(gzip).pipe(writeStream)
      .on('finish', () => {
        fs.unlinkSync(originalPath);
        console.log(`${file} succesfully compressed`);
        resolve("Succesfull compression");
      });
  })
}

async function cleanLogs(config) {
  const files = fs.readdirSync(config.absolutePath);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (path.extname(file) !== config.fileType) {
      continue;
    }
    const originalPath = path.join(config.absolutePath, file);

    const timestamp = Date.now();
    const timeInMs = fs.statSync(originalPath).mtimeMs;
    const ageInMs = timestamp - timeInMs;
  
    //Convert milliseconds -> seconds -> minutes -> hours -> days
    const timeInDays = ageInMs / (1000 * 60 * 60 * 24);

    if (timeInDays <= config.threshold) {
      continue;
    }

    if (config.action === "compress") {
      try {
        await compressFile(originalPath, timestamp, file);
      } catch (err) {
        console.error(`Failed to compress ${file}:`, err);
        const message = await inquirer.prompt({
          type: 'confirm',
          name: 'shouldContinue',
          message: 'Want to continue with the other logs?',
          default: false
        });
        if (message.shouldContinue) {
          continue;
        } 
        break;
      }
      

    } else if (config.action === "delete") {
      //Delete with validating each file
      const message = await inquirer.prompt({
        type: 'confirm',
        name: 'shouldDelete',
        message: `Are you sure you want to delete: ${file}?`,
        default: false, // Always default to false for not destructive
      });

      if (message.shouldDelete) {
        fs.unlinkSync(originalPath);
        console.log(`Deleted file: ${file}`);
      } else {
        console.log(`Skipped file: ${file}`);
      }
    } else {
      //Error
      console.error(
        `There was an error, invalid action ${config.action} (should be 'delete' or 'compress')`,
      );
      process.exit(1);
    }
  }
}

async function main() {
  const config = await getConfig();
  await cleanLogs(config);
}

main();