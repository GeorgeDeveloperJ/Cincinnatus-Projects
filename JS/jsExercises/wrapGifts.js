function wrapGifts(gifts) {
    if (gifts.length == 0) return [];
    const length = gifts[0].length + 2;
    const border = "*".repeat(length)

    return [
        border,
        ...gifts.map(gift => `*${gift}*`),
        border
    ]
}

let test1 = wrapGifts(["📷", "⚽️"])
/* Resultado:
[ '****',
  '*📷*',
  '*⚽️*',
  '****'
]
*/

let test2 = wrapGifts(["🏈🎸", "🎮🧸"])
/* Resultado:
[ '******',
  '*🏈🎸*',
  '*🎮🧸*',
  '******'
]
*/

let test3 = wrapGifts(["📷"])
/* Resultado:
[ '****',
  '*📷*',
  '****'
]
*/
console.log(test1)
console.log(test2)
console.log(test3)
