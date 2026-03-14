function contarOvejas(ovejas) {
    return ovejas.filter(oveja => {
        const name = oveja.name.toLowerCase();
        const isRed = oveja.color == 'rojo';
        const containsNa = name.includes("n") && name.includes("a");
        return isRed && containsNa;
    });
}
const ovejas = [
  { name: 'Noa', color: 'azul' },
  { name: 'Euge', color: 'rojo' },
  { name: 'Navidad', color: 'rojo' },
  { name: 'Ki Na Ma', color: 'rojo'},
  { name: 'AAAAAaaaaa', color: 'rojo' },
  { name: 'Nnnnnnnn', color: 'rojo'}
]

const ovejasFiltradas = contarOvejas(ovejas)

console.log(ovejasFiltradas)

// [{ name: 'Navidad', color: 'rojo' },
//  { name: 'Ki Na Ma', color: 'rojo' }]