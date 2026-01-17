function daysToXmas(date){
    const christmas = new Date('Dec 25, 2021');
    let diff_milisec = christmas - date;
    const diff_days = diff_milisec / 1000 / 60 / 60/ 24
    return Number(diff_days) 
}

const date1 = new Date('Dec 1, 2021')
console.log(daysToXmas(date1)) // 24
const date2 = new Date('Dec 24, 2021 00:00:01')
console.log(daysToXmas(date2)) // 1
const date3 = new Date('Dec 24, 2021 23:59:59')
console.log(daysToXmas(date3)) // 1
const date4 = new Date("December 20, 2021 03:24:00")
console.log(daysToXmas(date4)) // 5

