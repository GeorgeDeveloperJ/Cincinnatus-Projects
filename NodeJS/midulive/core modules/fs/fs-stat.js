const fs = require('node:fs') // Desde la Node 16.0.0, se recomienda poner Node: 

const stats = fs.statSync('./text.txt')

console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size
)

