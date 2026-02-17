// .js -> por defecto utiliza CommonJS
// .mjs -> por defecto utiliza ES Modules
// .cjs -> por defecto utliza CommonJS

import {sum, sub, mult} from './sum.mjs'

console.log(sum(4, 3))
console.log(sub(1, 2))
console.log(mult(2 * 52))