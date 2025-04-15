// IIFE representing the state of the game board
const Gameboard = (function() {
    let board = [[], [], [], [], [], [], [], [], []];
    // Creates a game background and adds to game container
    const createboardBackground = () => {
        const gameBoard = document.createElement('div');
        const gameContainer = document.querySelector('.game-container');
        gameBoard.classList.add('game-board');
        gameContainer.appendChild(gameBoard);
    }
    // Renders the board by creating squares and adding them to the game background
    const renderBoard = () => {
        console.log(board);
        board.forEach(element => {
            const gameBoard = document.querySelector('.game-board');
            console.log('test');
            const box = document.createElement('div');
            box.classList.add('box');
            gameBoard.appendChild(box);
        });
    }

    return {
        createboardBackground,
        renderBoard,
    }


})();

const createPlayer = (name, icon) => {

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
    
    return {
        start,
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