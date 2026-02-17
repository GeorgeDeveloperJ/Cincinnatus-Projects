//argumentos de entrada
console.log(process.argv)

//current working directory
console.log(process.cwd())

//platform
console.log(process.env)

//controlar el proceso y su salida
process.exit(1)

// //podemos controlar eventos del proceso
process.on('exit', () => {
    //limpiar los recursos
})

