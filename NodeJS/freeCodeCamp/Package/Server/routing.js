const http = require('node:http');
const { infoCursos } = require('./cursos.js');
const freeport = require('../../../midulive/free-port.js');


const server = http.createServer((req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return manejarSolicitudGet(req, res);
    case 'POST':
      return manejarSolicitudPost(req, res);
    default:
      console.log(`El metodo usado no puede ser manejado por el servidor: ${method}`);
  }
})

function manejarSolicitudGet (req, res) {
  const path = req.url;
  console.log(path);
  if (path === '/') {
    res.statusCode = 200;
    return res.end('Bienvenidos a mi primer server y API creados en NodeJS');
  } else if (path === '/cursos') {
    res.statusCode = 200;
    return res.end(JSON.stringify(infoCursos));
  } else if (path === '/cursos/programacion') {
    res.statusCode = 200;
    return res.end(JSON.stringify(infoCursos.programacion));
  }

  res.statusCode = 404;
  res.end("El recurso solicitado no existe");

}

function manejarSolicitudPost(req, res) {
  const path = req.url;

  if (path === '/cursos/programacion') {
    let body = '';
    req.on('data', content => {
      body += content.toString();
    })
    
    req.on('end', () => {
      console.log(body);
      console.log(typeof body);

      body = JSON.parse(body);
      console.log(body.id);
    })
  }

  
}

freeport.findAvailablePort(3000)
  .then(port => {
    server.listen(port, () => {
      console.log(`Server is listening... port: http://localhost:${port}`);
    })
  })
