function decodeNumbers(symbols) {
    const knownSymbols = {'.': 1, ',': 5, ':': 10, ';': 50, '!': 100};
    let result = 0;
    
    for (let i = 0; i < symbols.length; i++) {
        const currentSymbol = symbols[i]
        const nextSymbol = symbols[i + 1]

        const currentVal = knownSymbols[currentSymbol]
        const nextVal = knownSymbols[nextSymbol]

        if (currentVal === undefined) return NaN
        if (nextVal && currentVal < nextVal) {
            result -= currentVal
        } else {
            result += currentVal
        }
    }
    return result
}
console.log(decodeNumbers('...'))
console.log(decodeNumbers('.........!'))