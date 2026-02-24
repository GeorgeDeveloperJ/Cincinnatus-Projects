const http = require('node:http');

const { findAvailablePort } = require('../../midulive/free-port');

const server = http.createServer((req, res) => {
    console.log("==> req (solicitud)");
    console.log(req.url);
    console.log(req.method);
    res.end("Hola mundo!");
})

const port = findAvailablePort(3000);

server.listen(port, () => {
    console.log(`El servidor esta escuchando..., en el puerto: http://localhost:${port}`);
})