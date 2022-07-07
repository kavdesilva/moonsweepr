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
        row = grid.insertRow(i);
        for (j=0; j<10; j++){
            cell = row.insertCell(j);
            cell.onclick = function() { clickCell(this); } 
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



///////////////////////////////////// completed: n/a