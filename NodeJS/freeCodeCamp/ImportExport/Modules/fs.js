// Para volver estos metodos sincronos es solo agregarle Sync en lo ultimo

const fs = require('node:fs');
let content

// Leer un archivo
console.log("Antes de leer el archivo");

fs.readFile('data.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  } console.log("Text extracted"); content = data;
});

// Cambiar el nombre de un archivo
console.log("Antes de cambiar el nombre del archivo");

fs.rename('text.txt', 'data.txt', (err) => {
  if(err){
    throw err;
  } console.log("Name changed succesfully")})

// Agregar texto a un archivo
console.log("Agregandole texto a el archivo");

fs.appendFile('data.txt', ' exit(0)', (err) => {
  if (err) {
    throw err;
  } console.log("File updated")
})

// Escribir/Sobreescribir un archivo
console.log("Sobreescribiendo el archivo");

fs.writeFile('data.txt', 'Nueva data sobrescrbiendo el archivo', (err) => {
  if (err) { throw err;} console.log("Text changed");
})

// Eliminar un archivo
console.log("Elimando el archivo");

fs.unlink('data.txt', (err) => {
  if (err) { throw err;} console.log("File deleted");
})

