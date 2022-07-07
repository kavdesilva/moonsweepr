///////////////////////////////////// return home key

const returnHome = document.getElementById('return-home')

returnHome.addEventListener('click', () => {
    window.location='index.html'
})

///////////////////////////////////// build board 

const grid = document.getElementById('grid')
const testMode = true


const createBoard = () => {
    grid.innerHTML = ''
    for (i=0; i<10; i++){
        row = document.createElement('div')
        grid.appendChild(row);
        for (j=0; j<9; j++){
            cell = document.createElement('div')
            grid.appendChild(cell);
            cell.onclick = function() { clickCell(this); } 
        }
    }
    addMines()
}

const addMines = () => {
    for (i=0; i<20; i++){
        let cells = Math.floor(Math.random() *20)
        let cell = grid.cells[cells]
        cell.setAttribute('mine')
    }
}

createBoard()



///////////////////////////////////// game logic



///////////////////////////////////// completed: n/a