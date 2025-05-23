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
        const gameBoard = document.querySelector('.game-board');
        gameBoard.textContent = '';
        renderBoard();
    }

    const getGameBoard = () => board;

    // function that checks if a winning combination has been achieved
    const checkWinStatus = () => {
        winningGrids = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        for (let i = 0; i < winningGrids.length; i++) {
            if ((getGameBoard()[winningGrids[i][0]] === 'X'
                && getGameBoard()[winningGrids[i][1]] === 'X'
                && getGameBoard()[winningGrids[i][2]] === 'X')
                || (getGameBoard()[winningGrids[i][0]] === 'O'
                && getGameBoard()[winningGrids[i][1]] === 'O'
                && getGameBoard()[winningGrids[i][2]] === 'O')) {
                    return true;
            } 
        }
    }

    // Function that checks if all cells are filled with an icon 
    const checkTieStatus = () => {
        for (let i = 0; i < 8; i++) {
            if ((Gameboard.getGameBoard()[0] === 'X' || Gameboard.getGameBoard()[0] === 'O')
                && (Gameboard.getGameBoard()[1] === 'X' || Gameboard.getGameBoard()[1] === 'O')
                && (Gameboard.getGameBoard()[2] === 'X' || Gameboard.getGameBoard()[2] === 'O')
                && (Gameboard.getGameBoard()[3] === 'X' || Gameboard.getGameBoard()[3] === 'O')
                && (Gameboard.getGameBoard()[4] === 'X' || Gameboard.getGameBoard()[4] === 'O')
                && (Gameboard.getGameBoard()[5] === 'X' || Gameboard.getGameBoard()[5] === 'O')
                && (Gameboard.getGameBoard()[6] === 'X' || Gameboard.getGameBoard()[6] === 'O')
                && (Gameboard.getGameBoard()[7] === 'X' || Gameboard.getGameBoard()[7] === 'O')
                && (Gameboard.getGameBoard()[8] === 'X' || Gameboard.getGameBoard()[8] === 'O')) {
                    return true
                }
        }
    }

    // function that resets the game grid
    const restartGame = () => {
        for (let i = 0; i < Gameboard.getGameBoard().length; i++) {
            Gameboard.update(i, ['']);
            Gamecontroller.gameOver = false;
        }
    }

    const showCurrentPlayer = () => {
        showTurnHeading = document.querySelector('#turn');
        showTurnHeading.textContent = `It is player ${Gamecontroller.getCurrentPlayer()},'s turn`;
    }

    // Function to initialise the webpage when first loaded
    const showForm = document.querySelector('#show-start-button');
    const initialiseWebPage = () => {
        addEventListener("DOMContentLoaded", () => {
            showForm.showModal();
            const resetBtn = document.querySelector('#reset-game');
            const newPlayersBtn = document.querySelector('#new-players-btn');
            resetBtn.style.display = 'none';
            newPlayersBtn.style.display = 'none';
        });
    }

    // Reload the webpage to ask for the dialog form
    const reloadWebPage = () => {
        location.reload();
    }

    // Close the initial dialog box asking for players name
    const closeForm = () => {
        showForm.close();
    }

    const displayBtns = () => {
        const resetBtn = document.querySelector('#reset-game');
        const newPlayersBtn = document.querySelector('#new-players-btn');
        if (resetBtn.style.display === "none") {
            resetBtn.style.display = "block";
        } else {
            resetBtn.style.display = "none";
        };
        if (newPlayersBtn.style.display === "none") {
            newPlayersBtn.style.display = "block";
        } else {
            newPlayersBtn.style.display = "none";
        };
    };

    return {
        createboardBackground,
        renderBoard,
        update,
        getGameBoard,
        checkWinStatus,
        checkTieStatus,
        restartGame,
        showCurrentPlayer,
        initialiseWebPage,
        closeForm,
        reloadWebPage,
        displayBtns,
    }

})();

// Creates a player with a name and an icon (either X or O)
const createPlayer = (name, icon) => {
    return {
        name,
        icon
    }
}

// IIFE for controlling events during the game
const Gamecontroller = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    // Creates 2 players and assigns them either X or O, then creates and displays a tic tac toe grid
    const start = () => {
        const player1 = document.querySelector('#player-1');
        const player2 = document.querySelector('#player-2');
        players = [
            createPlayer(player1.value, 'X'),
            createPlayer(player2.value, 'O')
        ]
        if (players[0].name === '' || players[1].name === '') {
            alert('Please fill in all the fields');
        } else {
            currentPlayerIndex = 0;
            Gameboard.createboardBackground();
            Gameboard.renderBoard();
            Gameboard.closeForm();
            Gameboard.showCurrentPlayer();
            Gameboard.displayBtns();
        }
    }

    // Event: when a cell is clicked, it places the players icon on it if the cell is empty.
    // If the cell is occupied, a function stops the next player from placing their icon on it.
    // Then the event checks if there is a winner. If there is no winner, it finally checks for a draw
    // where it displays an alert and restarts the game.
    const handleClick = (event) => {
        event.preventDefault();
        let boxIndex = parseInt(event.target.id.split('-')[1]);


        if (Gameboard.getGameBoard()[boxIndex][0] !== "") {
            return;
        }
        Gameboard.update(boxIndex, players[currentPlayerIndex].icon);
        
        if (Gameboard.checkWinStatus() === true) {
            Gamecontroller.gameOver = true;
            alert(`Game over, Player ${players[currentPlayerIndex].name} won!`);
        } else if (Gameboard.checkTieStatus() === true) {
            Gamecontroller.gameOver = true;
            alert('Tie game')
        }
        
        if (Gamecontroller.gameOver === true) {
            const boxes = document.querySelectorAll('.box');
            boxes.forEach((box) => {
                box.removeEventListener('click', Gamecontroller.handleClick)
            })
        }
        // Replace the current player with the next player
        currentPlayerIndex = (currentPlayerIndex === 0) ? 1 : 0;
        Gameboard.showCurrentPlayer();
    }

    const getCurrentPlayer = () => players[currentPlayerIndex].name;
    
    const resetPlayerNames = () => {
        const player1 = document.querySelector('#player-1');
        const player2 = document.querySelector('#player-2');
        players = [
            createPlayer(player1.value, 'X'),
            createPlayer(player2.value, 'O')
        ];
    }
    return {
        start,
        handleClick,
        getCurrentPlayer,
        getCurrentPlayer,
        gameOver,
    }

})();


// IIFE for the buttons in the game
const gameBtns = (function() {
    // Starts a new game when the start new game button is clicked
    const newGameBtn = document.querySelector('#start-new-game');
    newGameBtn.addEventListener('click', () => {
            Gamecontroller.start();
    })

    // Restart the game with same players
    const restartGameBtn = document.querySelector('#reset-game');
    restartGameBtn.addEventListener('click', () => {
        Gameboard.restartGame();
    })

    // Creates a restart button for new players to start
    const resetGame = document.querySelector('#reset-game');
    const newPlayersBtn = document.createElement('button');
    newPlayersBtn.id = 'new-players-btn';
    newPlayersBtn.textContent = 'New Players'
    resetGame.after(newPlayersBtn);
    newPlayersBtn.addEventListener('click', () => {
        Gameboard.reloadWebPage();
    })
})();

// Show the form when the webpage initially loads
Gameboard.initialiseWebPage();

