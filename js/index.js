const playBtn = document.getElementById('play')
const level01 = document.getElementById('level-01')
const level02 = document.getElementById('level-02')
const level03 = document.getElementById('level-03')

let select01 = false
let select02 = false
let select03 = false


level01.addEventListener('click', () => {
    select01 = true
    select02 = false
    select03 = false
    console.log(select01, select02, select03)
})

level02.addEventListener('click', () => {
    select01 = false
    select02 = true
    select03 = false
    console.log(select01, select02, select03)
})

level03.addEventListener('click', () => {
    select01 = false
    select02 = false
    select03 = true
    console.log(select01, select02, select03)
})


playBtn.addEventListener('click', () => {
    if (select01 === true){
        window.location='level_00.html'
    } else if (select02 === true){
        window.location='level_02.html'
    } else if (select03 === true){
        window.location='level_03.html'
    }
})

