function listGifts(letter) {
    const gifts = letter.trim().split(" ");
    const result = {};
    gifts.forEach(gift => {
        if(gift.startsWith("_") || gift == ""){}
        else{
            result[gift] = (result[gift] || 0) + 1;
        }
    });
    return result;
}

const carta = 'bici coche balón _playstation bici coche peluche'
console.log(listGifts(carta))