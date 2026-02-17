import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('./text.txt', 'utf-8'),
    readFile('./text1.txt', 'utf-8')
]).then(([text, secondText]) => {
    console.log("Primer texto:", text)
    console.log("Second texto", secondText)
})
