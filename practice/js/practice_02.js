///////////////////////////////////// tutorial practice **(Youtube.com - Code with Ania Kubów tutorial)**

///////////////////////////////////// return home key

const returnHome = document.getElementById('return-home')

returnHome.addEventListener('click', () => {
    window.location='../index.html'
})

///////////////////////////////////// build board 

const grid = document.querySelector('.grid')
const result = document.querySelector('#result')
const flagsLeft = document.querySelector('#flags-left')
const pointsScored = document.querySelector('#score')

flagsLeft.innerText = 20
pointsScored.innerText = 0

let width = 10
let squares = []
let mineAmount = 20
let flags = 0
let score = []

let isgameOver = false

const createBoard = () => {
    // creates shuffled game array of random mines
    const mineArray = Array(mineAmount).fill('mine')
    const emptyArray = Array(width*width - mineAmount).fill('safe')
    // console.log(mineArray, emptyArray) // tests array creation

    const gameArray = emptyArray.concat(mineArray)
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)
    // console.log(shuffledArray) // tests to see if arrays are concatenated & randomized

    // creates squares within grid div
    for(i=0; i < width*width; i++){
        const square = document.createElement('div')
        square.setAttribute('id', i)
        square.classList.add(shuffledArray[i])
        grid.appendChild(square)
        squares.push(square)

        // click event added to each square
        square.addEventListener('click', (e) => {
            click(square)
        })

        // right-click event to add flag to square 
        square.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            addFlag(square)
        })
    }


    // adds number of adjacent mines to square
    for(i=0; i < squares.length; i++){
        let total = 0 // same as 'mineCount' in previous tutorial
        const isLeftEdge = (i % width === 0)
        const isRightEdge = (i % width === width-1)
        if (squares[i].classList.contains('safe')){
            if (i > 0 && !isLeftEdge && squares[i-1].classList.contains('mine')) total++
            if (i > 9 && !isRightEdge && squares[i+1 -width].classList.contains('mine')) total++
            if (i > 10 && squares[i -width].classList.contains('mine')) total++
            if (i > 11 && !isLeftEdge && squares[i-1 -width].classList.contains('mine')) total++
            if (i < 98 && !isRightEdge && squares[i+1].classList.contains('mine')) total++
            if (i < 90 && !isLeftEdge && squares[i-1 +width].classList.contains('mine')) total++
            if (i < 88 && !isRightEdge && squares[i+1 +width].classList.contains('mine')) total++
            if (i < 89 && squares[i +width].classList.contains('mine')) total++
            squares[i].setAttribute('data', total)
            // ^^ this code is insane. setting up a table with a for loop in the other tutorial was much faster: it had implicit rules about rows/columns, and you could count the cells without having to account for counting to the left/right at each edge.

            // console.log(squares[i]) // tests to see contents of each square, including total
        }
    }
}
createBoard()

///////////////////////////////////// game logic

const click = (square) => {
    let currentId = square.id
    if (isgameOver) return
    if (square.classList.contains('checked') || 
        square.classList.contains('checked-0') || 
        square.classList.contains('flag')) {
            return}
    if (square.classList.contains('mine')){
        // console.log('game over') // tests whether mines are working
        alert('you hit a mine.\ngame over.')
        gameOver()
    } else {
        let total = square.getAttribute('data')
        if (total !=0) {
            square.classList.add('checked')
            if (total == 1) square.classList.add('one')
            if (total == 2) square.classList.add('two')
            if (total == 3) square.classList.add('three')
            if (total >= 4) square.classList.add('four-plus')
            square.innerText = total
            score.push(parseInt(total))
            const sum = score.reduce((accumulator, total) => {
                return accumulator + total
              }, 0)
            pointsScored.innerText = sum
            // ^^ IT WORKED!!!!! score is the total added up
            return
        }
    }
    checkSquare(square, currentId)
    square.classList.add('checked')
}
// ^^ writing the click functions this way does help with styling as the classes are more clearly dilineated from the set up of the grid (which is covered in math in the previous tutorial--any disruption and you risk breaking it altogether).


const checkSquare = (square, currentId) => {
// checks neighboring squares once square is clicked.
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width -1)

    setTimeout(() => {
        if (currentId > 0 && !isLeftEdge){
            const newId = squares[parseInt(currentId) -1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId > 9 && !isRightEdge){
            const newId = squares[parseInt(currentId) +1 -width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId > 10){
            const newId = squares[parseInt(currentId) -width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId > 11 && !isLeftEdge){
            const newId = squares[parseInt(currentId) -1 -width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId < 98 && !isRightEdge){
            const newId = squares[parseInt(currentId) +1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId < 90 && !isLeftEdge){
            const newId = squares[parseInt(currentId) -1 +width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId < 88 && !isRightEdge){
            const newId = squares[parseInt(currentId) +1 +width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId < 89){
            const newId = squares[parseInt(currentId) +width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
    }, 10)
}
// ^^ this code feels unnecessarily complicated. making the div a continuous array (instead of using nested for loop to create columns and rows) that you have to keep amending the rules in order to account for left and right edges ends up making many of these functions repetetive, messy and confusing. this is not DRY code (!DRY). also had to remove styling above on squares with points to get recursive call to work.

const addFlag = (square) => {
    if (isgameOver) return
    if (!square.classList.contains('checked') && (flags < mineAmount)) {
        if (!square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = ' 🚩'
            flags++
            flagsLeft.innerHTML = mineAmount -flags
            checkWin()
        } else {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags--
            flagsLeft.innerText = mineAmount -flags
        }
    }
}

const gameOver = (square) => {
    result.innerHTML = '<h2>game over</h2>'
    isgameOver = true
    squares.forEach(square => {
        if (square.classList.contains('mine')) {
            square.classList.add('checked')
            square.style.backgroundColor = 'orangered'
          // reveals all mines on board
        }
    })
}

const checkWin = () => {
    let matches = 0

    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('mine')) {matches ++}
        if (matches === mineAmount) {
            result.innerHTML = 'YOU WIN!'
            isGameOver = true
        }
    }
}
// ^^ these are the win rules for traditional minesweeper, with flags covering all mines, but in my last practice, the win was triggered simply by exposing all squares without hitting any mines. i might stick to the latter for my final deployment, since there is a functional points system in place, but for now i'm pretty happy with the results. :)

///////////////////////////////////// /* grid styling below **(Youtube.com - Code with Ania Kubów tutorial)** */

// .grid {
//     height: 400px;
//     width: 400px;
//     display: flex;
//     flex-wrap: wrap;
//     background-color: grey;
//     margin: 0 auto;
//     border: 1px solid white;
// }

// .grid div {
//     height: 38px;
//     width: 38px;
//     border: 1px solid white;
//     font-size: 2rem;
//     line-height: 140%;
// }

// .checked {
//     background-color: lightgray;
// }

// .one {
//     background-color: rgba(159, 235, 235, 0.959);
// }
// .two {
//     background-color: aquamarine;
// }
// .three {
//     background-color: rgb(92, 245, 237);
// }
// .four-plus {
//     background-color: cyan;
// }

// /* .mine {
//     background-color: orangered;
// } */
// /* ^^ use for testing mechanics without constantly ending game by accident */

///////////////////////////////////// completed: thursday 7/7/2022 10:59am