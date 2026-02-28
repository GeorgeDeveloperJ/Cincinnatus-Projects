const http = require('node:http');
const { infoCursos } = require('./cursos.js');
const freeport = require('../../midulive/free-port.js');


const server = http.createServer((req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return manejarSolicitudGet();
    default:
      console.log(`El metodo usado no puede ser manejado por el servidor: ${method}`);
  }
})

function manejarSolicitudGet (req, res) {
  const path = req.url;

  if (path === '/') {
    res.statusCode = 200;
    res.end('Bienvenidos a mi primer server y API creados en NodeJS');
  } else if (path === '/curos') {
    res.statusCode = 200;
    res.end(JSON.stringify(infoCursos));
  }
}

freeport.findAvailablePort(3000)
  .then(port => {
    server.listen(port, () => {
      console.log(`Server is listening... port: http://localhost:${port}`);
    })
  })
