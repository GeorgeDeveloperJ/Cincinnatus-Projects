const express = require('express');
const app = express();

const infoCursos = require('./cursos.js');

//Routing

app.get('/', (req, res) => {
  res.send('Mi primer servidor. Cursos');
});

app.get('/api/cursos', (req, res) => {
  console.log("HELL NAW");
  console.log(JSON.stringify(infoCursos));
  res.send(JSON.stringify(infoCursos));
})

app.get('/api/cursos/programacion', (req, res) => {
  res.send(JSON.stringify(infoCursos.programacion));
})

app.get('/api/cursos/matematicas', (req, res) => {
  res.send(JSON.stringify(infoCursos.matematicas));
})

app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
  
  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de: ${lenguaje}`);
  }
  res.send(JSON.stringify(resultados));

})

const PORT = process.env.PORT || 3009;

app.listen(PORT, () => {
  console.log("Servers listening on port: http://localhost:"+PORT)
})