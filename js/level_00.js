///////////////////////////////////// return home key

const returnHome = document.getElementById('return-home')

returnHome.addEventListener('click', () => {
    window.location='intro.html'
})

///////////////////////////////////// build board **(Youtube.com - Code with Ania Kubów tutorial)**

const grid = document.querySelector('.grid')
let width = 10
let squares = []
let mineAmount = 20

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
    if (square.classList.contains('mine')){
        console.log('game over') // tests whether mines are working
    } else {
        let total = square.getAttribute('data')
        if (total !=0) {
            square.classList.add('checked')
            square.innerText = total
            return
        } else {
            square.classList.add('checked-0')
        }
    }
}
// ^^ writing the click functions this way does help with styling as the classes are more clearly dilineated from the set up of the grid (which is covered in math in the previous tutorial--any disruption and you risk breaking it altogether).


///////////////////////////////////// completed: n/a