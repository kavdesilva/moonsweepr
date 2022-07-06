///////////////////////////////////// return home key

const returnHome = document.getElementById('return-home')

returnHome.addEventListener('click', () => {
    window.location='intro.html'
})

///////////////////////////////////// build board **(101computing.net tutorial)**

const grid = document.getElementById('grid')
const testMode = true; // set to true to see mine location

const generateGrid = () => {
    // generates 10x10 grid
    // i = row; j = column
    grid.innerHTML = ""
    for (i=0; i<10; i++){
        row = grid.insertRow(i);
        for (j=0; j<10; j++){
            cell = row.insertCell(j);
            cell.onclick = () => {clickCell(this)}
            let mine = document.createAttribute('data-mine')
            mine.value = 'true'
            cell.setAttributeNode(mine)
        }
    }
    addMines()
}

const addMines = () => {
    // adds mines randomly
    for (i=0; i<20; i++){
        let row = Math.floor(Math.random() * 10)
        let col = Math.floor(Math.random() * 10)
        let cell = grid.rows[row].cells[col]
        cell.setAttribute('data-mine', 'true')
        if (testMode) cell.innerHTML='X'
    }
}
generateGrid()

///////////////////////////////////// game logic