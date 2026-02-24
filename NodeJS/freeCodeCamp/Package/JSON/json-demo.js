const curso = require('../curso.json');

console.log(curso);
console.log(typeof curso);

//Object -> string
const cursoString = JSON.stringify(curso);
//String -> object
const cursoObject = JSON.parse(cursoString);

console.log(cursoString);
console.log(cursoObject);
