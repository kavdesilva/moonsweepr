///////////////////////////////////// return home key

const returnHome = document.getElementById('return-home')

returnHome.addEventListener('click', () => {
    window.location='index.html'
})

///////////////////////////////////// build board 

const grid = document.getElementById('grid')
const result = document.getElementById('result')

const playAgain = document.getElementById('replay')

const pointsScored = document.querySelector('#score')
pointsScored.innerText = 0
let score = []

let minesLeft = 0
let cellsChecked = 0

const createBoard = () => {
    grid.innerHTML = ''
    for (var i=0; i<7; i++){
        row = grid.insertRow(i);
        for (var j=0; j<7; j++){
            cell = row.insertCell(j);
            cell.onclick = function() {click(this);}
            cell.addEventListener('contextmenu', function (e) {
                e.preventDefault()
                addFlag(this)
            })
        }
    }
    for (i=0; i<14; i++){
        let row = Math.floor(Math.random() * 7)
        let col = Math.floor(Math.random() * 7)
        let cell = grid.rows[row].cells[col]
        cell.classList.add('mine')
    }
}
createBoard()

const countMines = () => {
    for (i=0; i<7; i++) {
        for (j=0; j<7; j++){
            let cell = grid.rows[i].cells[j]
            if (cell.classList.contains('mine')) minesLeft++
        }
    }
}
countMines()

const flagsLeft = document.querySelector('#flags-left')
flagsLeft.innerText = minesLeft
let flags = 0

///////////////////////////////////// game logic

let gameOver = false

const click = (cell) => {
    if (gameOver === true) return
    if (cell.classList.contains('flag')) return
    if (cell.classList.contains('checked')) return
    if (cell.classList.contains('mine')){
        result.innerText = 'game over'
        gameOver = true
        displayReplay()
        for (i=0; i<7; i++) {
            for (j=0; j<7; j++){
                let cell = grid.rows[i].cells[j]
                if (cell.classList.contains('mine')) cell.style.backgroundColor = 'orangered'
            }
        }
    } else {
        cell.classList.add('checked')
        let mineAdjacent = 0
        let cellRow = cell.parentNode.rowIndex
        let cellCol = cell.cellIndex
        for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,6); i++) {
            for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,6); j++){
                if (grid.rows[i].cells[j].classList.contains('mine')) mineAdjacent++;
            }
        }
        if (mineAdjacent === 0){
            setTimeout(() => {
                for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,6); i++) {
                    for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,6); j++) {
                    if (!grid.rows[i].cells[j].classList.contains('checked') && 
                        !grid.rows[i].cells[j].classList.contains('mine')) click(grid.rows[i].cells[j])
                    }
                }
            }, 10)
        }
        if (mineAdjacent !=0) {
            if (mineAdjacent == 1) cell.classList.add('one')
            if (mineAdjacent == 2) cell.classList.add('two')
            if (mineAdjacent == 3) cell.classList.add('three')
            if (mineAdjacent >= 4) cell.classList.add('four-plus')
            cell.innerText = mineAdjacent
            score.push(parseInt(mineAdjacent))
            const sum = score.reduce((accumulator, mineAdjacent) => {
                return accumulator + mineAdjacent
              }, 0)
            pointsScored.innerText = sum
        }
        if (cell.classList.contains('checked')) cellsChecked++
    }
    checkLevelComplete()
}

const addFlag = (cell) => {
    if (gameOver === true) return
    if (!cell.classList.contains('checked') && (flags < minesLeft +1)) {
        if (!cell.classList.contains('flag')) {
            cell.classList.add('flag')
            cell.innerHTML = ' 🚩'
            flags++
            flagsLeft.innerHTML = minesLeft -flags
        } else {
            cell.classList.remove('flag')
            cell.innerHTML = ''
            flags--
            flagsLeft.innerText = minesLeft -flags
        }
    }
}

const checkLevelComplete = () => {
    let levelComplete = false
    if (49 - cellsChecked == minesLeft) {
        levelComplete = true
    }
    if (levelComplete == true){
        result.innerText = 'you win!'
        gameOver = true
        displayReplay()
    }
}

const displayReplay = () => {
    setTimeout(() => {
        if (gameOver == true) {
            playAgain.style.visibility = 'visible'
        } 
    }, 900)
}

playAgain.addEventListener('click', () => {
    gameOver = false
    createBoard()
    result.innerText = ''
    playAgain.style.visibility = 'hidden'
    pointsScored.innerText = 0
    score = []
    minesLeft = 0
    cellsChecked = 0
    countMines()
    flags = 0
    flagsLeft.innerText = minesLeft
})

///////////////////////////////////// completed: n/a