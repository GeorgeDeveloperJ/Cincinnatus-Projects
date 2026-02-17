const fs = require('node:fs')

console.log("Leyendo el primer archivo...")
fs.readFile('./text.txt', 'utf-8', (err, text) => {
    console.log("Primer archivo", text)
})

console.log("Hacer cosas mientras lee el segundo archivo")

console.log("Leyendo el segundo archivo...")
fs.readFile('./text1.txt', 'utf-8', (err, text) => {
    console.log("Segundo archivo", text)
})