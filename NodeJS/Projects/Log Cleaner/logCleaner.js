const fs = require('node:fs');
const zlib = require('node:zlib');
const inquirer = require('inquirer');

if (!fs.existsSync('./config.json')) {
  inquirer
    .prompt([
      {
        name: 'absolutePath',
        message: 'What is the absolute path to your log directory [default set to ./logs]',
        default: './logs'
      },
      {
        name:'threshold',
        type: 'number',
        message: 'How many days of logs do you want to keep? [default set to 14]',
        default: 14
      },
      {
        name: 'fileType',
        message: 'What file extension should we look for? [default set to .log]',
        default: '.log'
      },
      {
        name: 'action',
        type: 'list',
        message: 'What should we do with the logs older than your threshold?'
      }
    ])
    .then((answers) => {
      fs.writeFileSync('./config.json', (answers) => {
        
      })
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment")
      } else {
        console.error("Something went wrong", error)
      }
    });
    
}


