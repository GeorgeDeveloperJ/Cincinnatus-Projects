const myUrl = new URL('https://www.ejemplo.org/cursos/programacion?ordenar=vistas&nivel=1');

console.log(myUrl.hostname); // www.ejemplo.org
console.log(myUrl.pathname); // /cursos/programacion
console.log(myUrl.searchParams); // URLSearchParams { 'ordenar' => 'vistas', 'nivel' => '1' }
console.log(typeof myUrl.searchParams); // object
console.log(myUrl.searchParams.get('ordenar')); // vistas