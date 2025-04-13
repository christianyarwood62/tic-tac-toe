function gameboard() {
    const rows = 3;
    const columns = 3;
    board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        console.log(board);
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
}

function Cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
        value = player;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
        addToken,
        getValue
    };
}

gameboard()