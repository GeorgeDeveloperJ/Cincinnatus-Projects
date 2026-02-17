const fs = require('node:fs/promises')

// IIFE - Inmediately Invoked Function Expression
;(
    async () => {
        console.log("Leyendo el primer archivo...")
        const text = await readFile('./text.txt', 'utf-8')
        console.log("Primer texto:", text)
        console.log("--> Haciendo cosas mientras se lee el texto")
        console.log("Segundo texto...")
        const secondText = await readFile('./text1.txt', 'utf-8')
        console.log("Segundo texto:", secondText)
})