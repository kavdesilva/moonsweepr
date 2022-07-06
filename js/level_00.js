///////////////////////////////////// return home key

const returnHome = document.getElementById('return-home')

returnHome.addEventListener('click', () => {
    window.location='intro.html'
})

///////////////////////////////////// build board **(101computing.net tutorial)**

const grid = document.getElementById('grid')
const testMode = false; // set to true to see mine location

const generateGrid = () => {
    // generates 10x10 grid
    // i = row; j = column
    grid.innerHTML = ''
    for (i=0; i<10; i++){
        row = grid.insertRow(i);
        for (j=0; j<10; j++){
            cell = row.insertCell(j);
            cell.onclick = function() { clickCell(this); } 
            // to get the clickCell function to work, i had to switch from arrow function syntax to deprecated declaration(??), now game functions as intended. 
            let mine = document.createAttribute('data-mine')
            mine.value = 'false'
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

const revealMines = () => {
    // highlights mines in red--see level_00.css for attributes/classes
    // i = row; j = column
    for (i=0; i<10; i++) {
        for (j=0; j<10; j++){
            let cell = grid.rows[i].cells[j]
            if (cell.getAttribute('data-mine')==='true') cell.className='mine'
        }
    }
}

const checkLevelCompletion = () => {
    let levelComplete = true
    for (i=0; i<10; i++) {
        for (j=0; j<10; j++){
            if((grid.rows[i].cells[j].getAttribute('data-mine')==='false') && (grid.rows[i].cells[j].innerHTML==='')) levelComplete = false
        }
    }
    if (levelComplete) {
        alert('you win')
        revealMines()
    }
}

const clickCell = (cell) => {
    //check if user clicked on a mine
    if(cell.getAttribute('data-mine')==='true'){
        revealMines()
        alert('you hit a mine\n\ngame over')
    } else {
        cell.className='clicked'
        // count and display number of adjacent mines
        let mineCount = 0
        let cellRow = cell.parentNode.rowIndex
        let cellCol = cell.cellIndex
        for (i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++){
            for (j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++){
                if (grid.rows[i].cells[j].getAttribute('data-mine')=='true') mineCount++;
            }
        }
        cell.innerHTML=mineCount
        if (mineCount===0){
            // reveal adjacent cells without mines
            for (i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
                for(j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
                  // recursive call - i don't exactly know what this means.
                  if (grid.rows[i].cells[j].innerHTML=='') clickCell(grid.rows[i].cells[j]);
                }
            }
        }
        checkLevelCompletion()
    }
}
