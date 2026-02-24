function mostrarTema(tema) {
  console.log(`Estoy aprendiendo ${tema}`);
}

function sumar(a, b) {
  console.log(a + b);
}


let number = 0;
setInterval(() => {
  console.log(number++);
}, 1000);

console.log("Antes del setImmediate()");
setImmediate(mostrarTema, 'NodeJS');
console.log("Despues de setImmediate");


setTimeout(mostrarTema, 5000, "Unemployment");
setTimeout(sumar, 1000, 5, 6);