// IIFE representing the state of the game board
const Gameboard = (function() {
    let board = [[''], [''], [''], [''], [''], [''], [''], [''], ['']];
    // Creates a game background and adds to game container
    const createboardBackground = () => {
        const gameBoard = document.createElement('div');
        const gameContainer = document.querySelector('.game-container');
        gameBoard.classList.add('game-board');
        gameContainer.appendChild(gameBoard);
    }
    // Renders the board by creating squares and adding them to the game background
    const renderBoard = () => {
        board.forEach((icon, index) => {
            const gameBoard = document.querySelector('.game-board');
            const box = document.createElement('div');
            box.textContent = icon;
            box.classList.add('box');
            box.setAttribute('id', `box-${index}`)
            gameBoard.appendChild(box);
        });
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => {
            box.addEventListener('click', Gamecontroller.handleClick)
        })
    }

    // Updates the box when clicked with an icon
    const update = (boxIndex, value) => {
        board[boxIndex] = value;
        console.log(board);
        const gameBoard = document.querySelector('.game-board');
        gameBoard.textContent = '';
        renderBoard();
    }

    return {
        createboardBackground,
        renderBoard,
        update,
    }


})();

// Creates a player with a name and an icon (either X or O)
const createPlayer = (name, icon) => {
    return {
        name,
        icon
    }
}

const Gamecontroller = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    // Creates 2 players and assigns them either X or O, then creates and displays a tic tac toe grid
    const start = () => {
        players = [
            createPlayer(document.querySelector('#player-1').value, 'X'),
            createPlayer(document.querySelector('#player-2').value, 'O')
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.createboardBackground();
        Gameboard.renderBoard();
    }

    const handleClick = (event) => {
        let boxIndex = parseInt(event.target.id.split('-')[1]);
        Gameboard.update(boxIndex, players[currentPlayerIndex].icon);

        currentPlayerIndex = (currentPlayerIndex === 0) ? 1 : 0;
    }
    
    return {
        start,
        handleClick,
    }

})();


// IIFE for the buttons in the game
const gameBtns = (function() {
    // The start new game button when clicks runs the start function
    const newGameBtn = document.querySelector('#start-new-game');
    newGameBtn.addEventListener('click', () => {
    Gamecontroller.start();
})
})();