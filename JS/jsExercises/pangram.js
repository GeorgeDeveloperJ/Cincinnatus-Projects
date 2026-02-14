function pangram(letter) {
  const abecedarioArray = 'abcdefghijklmnñopqrstuvwxyz'.split('');
  
  let letterLow = letter
    .toLowerCase()
    .replace(/[áàä]/g, 'a')
    .replace(/[éèë]/g, 'e')
    .replace(/[íìï]/g, 'i')
    .replace(/[óòö]/g, 'o')
    .replace(/[úùü]/g, 'u');
  
  return abecedarioArray.every(char => letterLow.includes(char));
}

// Tests
p1 = pangram('Extraño pan de col y kiwi se quemó bajo fugaz vaho'); // true
p2 = pangram('Jovencillo emponzoñado y con walkman: ¡qué figurota exhibes!'); // true
p3 = pangram('Esto es una frase larga pero no tiene todas las letras del abecedario'); // false
p4 = pangram('De la a a la z, nos faltan letras'); // false

console.log(p1);
console.log(p2);
console.log(p3);
console.log(p4);