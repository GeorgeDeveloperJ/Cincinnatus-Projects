function fixFiles(files) {
    const result = []
    const repeated = []
    for (let i = 0; i < files.length; i++){
        currentDir = files[i]
        if (!(repeated.includes(currentDir))) {
            result.push(currentDir)
            repeated.push(currentDir)}
        else {
            const k = repeated.filter(dir => dir === currentDir).length 
            result.push(`${currentDir}(${k})`)
            repeated.push(currentDir)
        }
    }
    return result
}

const files = ['photo', 'postcard', 'photo', 'photo', 'video']
fixFiles(files) // ['photo', 'postcard', 'photo(1)', 'photo(2)', 'video']
console.log(fixFiles(files))
const files2 = ['file', 'file', 'file', 'game', 'game']
fixFiles(files2) //['file', 'file(1)', 'file(2)', 'game', 'game(1)']
console.log(fixFiles(files2))
// ojo que los elfos ya tenían archivos con (1)... ¡y pueden estar repetidos!
const files3 = ['file', 'file(1)', 'icon', 'icon(1)', 'icon(1)']
fixFiles(fixFiles(files3)) // ['file', 'file(1)', 'icon', 'icon(1)', 'icon(1)(1)']
