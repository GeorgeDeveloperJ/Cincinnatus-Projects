const os = require('node:oss')

console.log('Info del Sistema Operativo')
console.log('-----------------------')

console.log('Nombre del sistema operativo', os.platform())
console.log('Version del sistema operativo', os.release())
console.log('Arquitectura', os.arch())
console.log('CPUs', os.cpus()) // <-- Vamos a poder escalar procesos en Node
console.log('Memoria libre', os.freemem() / 1024 / 1024) // En bytes pasado a MB
console.log('Memoria total', os.totalmem()) //