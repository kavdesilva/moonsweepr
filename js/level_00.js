///////////////////////////////////// return home key

const returnHome = document.getElementById('return-home')

returnHome.addEventListener('click', () => {
    window.location='index.html'
})

///////////////////////////////////// build board 

const grid = document.getElementById('grid')

const pointsScored = document.querySelector('#score')
pointsScored.innerText = 0
let score = []

const flagsLeft = document.querySelector('#flags-left')
flagsLeft.innerText = 20

const createBoard = () => {
    grid.innerHTML = ''
    for (i=0; i<10; i++){
        row = grid.insertRow(i);
        for (j=0; j<10; j++){
            cell = row.insertCell(j);
            cell.onclick = function() {click(this);}
        }
    }
    for (i=0; i<20; i++){
        let row = Math.floor(Math.random() * 10)
        let col = Math.floor(Math.random() * 10)
        let cell = grid.rows[row].cells[col]
        cell.setAttribute('class', 'mine')
    }
}
createBoard()

///////////////////////////////////// game logic

let gameOver = false

const click = (cell) => {
    if (gameOver === true) return
    if (cell.classList.contains('mine')){
        alert('game over')
        gameOver = true
        for (i=0; i<10; i++) {
            for (j=0; j<10; j++){
                let cell = grid.rows[i].cells[j]
                if (cell.classList.contains('mine')) cell.style.backgroundColor = 'orangered'
            }
        }
    } else {
        cell.setAttribute('class', 'checked')
        let mineCount = 0
        let cellRow = cell.parentNode.rowIndex
        let cellCol = cell.cellIndex
        for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
            for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++){
                if (grid.rows[i].cells[j].classList.contains('mine')) mineCount++;
            }
        }
        if (mineCount === 0){
            for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
                for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
                  if (!grid.rows[i].cells[j].classList.contains('checked') && !grid.rows[i].cells[j].classList.contains('mine')) click(grid.rows[i].cells[j])
                }
            }
        }
        if (mineCount !=0) {
            if (mineCount == 1) cell.classList.add('one')
            if (mineCount == 2) cell.classList.add('two')
            if (mineCount == 3) cell.classList.add('three')
            if (mineCount >= 4) cell.classList.add('four-plus')
            cell.innerText = mineCount
            score.push(parseInt(mineCount))
            const sum = score.reduce((accumulator, mineCount) => {
                return accumulator + mineCount
              }, 0)
            pointsScored.innerText = sum
        }
    }
}

///////////////////////////////////// completed: n/a