import fs from "node:fs";
import zlib from "node:zlib";
import inquirer from "inquirer";
import path from "node:path";

if (!fs.existsSync("./config.json")) {
  inquirer
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
    ])
    .then((answers) => {
      fs.writeFileSync("./config.json", JSON.stringify(answers));
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment");
      } else {
        console.error("Something went wrong", error);
      }
    });
} else {
  const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

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
      //Compress using streams for fast pacing
      const readStream = fs.createReadStream(originalPath);
      const writeStream = fs.createWriteStream(originalPath + '-' + timestamp + '.gz');
      const gzip = zlib.createGzip();

      readStream.pipe(gzip).pipe(writeStream)
        .on('finish', () => {
          fs.unlinkSync(originalPath);
          console.log(`${file} succesfully compressed`);
        });

    } else if (config.action === "delete") {
      //Delete with validating each file
      const answers = await inquirer.prompt({
        type: 'confirm',
        name: 'shouldDelete',
        message: `Are you sure you want to delete: ${file}?`,
        default: false, // Always default to false for not destructive
      });

      if (answers.shouldDelete) {
        fs.unlinkSync(originalPath);
        console.log(`Deleted file: ${file}`);
      } else {
        console.log(`Skipped file: ${file}`);
      }
    } else {
      //Error
      console.error(
        `There was an error, invalid action ${config.action} (should be 'delete' or 'compres')`,
      );
      process.exit(1);
    }
  }
}
