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

createBoard = () => {
    // creates shuffled game array of random mines
    const mineArray = Array(mineAmount).fill('mine')
    const emptyArray = Array(width*width - mineAmount).fill('safe')
    const gameArray = emptyArray.concat(mineArray)
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)

    // creates squares within grid div
    for(i=0; i < width*width; i++){
        const square = document.createElement('div')
        square.setAttribute('id', i)
        square.classList.add(shuffledArray[i])
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard()




///////////////////////////////////// completed: n/a