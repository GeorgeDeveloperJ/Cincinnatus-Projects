const http = require('node:http');

const { findAvailablePort } = require('../../midulive/free-port');

const server = http.createServer((req, res) => {
  console.log("==> req (solicitud)");
  console.log(req.url);
  console.log(req.method);
  console.log(res.statusCode); // 200 good
  res.statusCode = 404;
  console.log(res.statusCode); // 404 not found
  res.end("Hola mundo!");
  res.setHeader('content-type', 'application/json');
  console.log(res.getHeaders());
})

findAvailablePort(3000)
  .then( port => {
    server.listen(port, () => {
      console.log(`Server is listening... on http://localhost:${port}`)
    })
  })
