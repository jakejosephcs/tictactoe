const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Default board. 2D array representing rows and columns and their cells
let board = [["", "", ""], ["", "", ""], ["", "", ""]];

// Array of winning combos used to check for a winner after each turn
const winningBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// MODULE PATTERN: Controls the game flow
const gameBoard = (() => {
    const convertCoordinates = (coordinates) => {
        let i = Math.floor((coordinates.clientX - canvas.getBoundingClientRect().x) / 100); 
        let j = Math.floor((coordinates.clientY - canvas.getBoundingClientRect().y) / 100);

        return [i, j]
    }

    const valueExists = (i, j) => {
        return board[j][i];
    }
    
    const checkForWinner = (board, player) => {
        let convertedBoard = convertBoardTo1D(board);
        let winner;
        for (let i = 0; i < winningBoard.length; i++) {
            winner = true;
            for (let j = 0; j < winningBoard[i].length; j++) {
                winner = convertedBoard[winningBoard[i][j]] == player.marker && winner;
            }
            if (winner) return winner;
        }
        return winner;
    };

    const checkForTie = (board) => {
        let convertedBoard = convertBoardTo1D(board);
        return !convertedBoard.includes("") 
    }

    const convertBoardTo1D = (board) => {
        let convertedBoard = [];
        for (let i = 0; i < board.length; i++) {
            convertedBoard = convertedBoard.concat(board[i])
        }
        return convertedBoard;
    }

    return {
        convertCoordinates,
        valueExists,
        checkForWinner,
        checkForTie,
    }

})();

// MODULE PATTERN: Controls what is displayed
const displayController = (() => {
    const drawBoard = () => {
        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(100, 300);
        ctx.moveTo(200, 0);
        ctx.lineTo(200, 300);
        ctx.moveTo(0, 100);
        ctx.lineTo(300, 100);
        ctx.moveTo(0, 200);
        ctx.lineTo(300, 200);
        ctx.stroke();
        ctx.closePath();
    };

    const drawX = (i, j) => {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        if (j == 0 && i != 0)  {
            ctx.beginPath();
            ctx.moveTo(`${i}25`, 25);
            ctx.lineTo(`${i}75`, 75);
            ctx.moveTo(`${i}75`, 25);
            ctx.lineTo(`${i}25`, 75);
            ctx.stroke();
            ctx.closePath();
        } else if (j != 0 && i != 0) {
            ctx.beginPath();
            ctx.moveTo(`${i}25`, `${j}25`);
            ctx.lineTo(`${i}75`, `${j}75`);
            ctx.moveTo(`${i}75`, `${j}25`);
            ctx.lineTo(`${i}25`, `${j}75`);
            ctx.stroke();
            ctx.closePath();
        } else if (j != 0 && i == 0) {
            ctx.beginPath();
            ctx.moveTo(25, `${j}25`);
            ctx.lineTo(75, `${j}75`);
            ctx.moveTo(75, `${j}25`);
            ctx.lineTo(25, `${j}75`);
            ctx.stroke();
            ctx.closePath();
        } else {
            ctx.beginPath();
            ctx.moveTo(25, 25);
            ctx.lineTo(75, 75);
            ctx.moveTo(75, 25);
            ctx.lineTo(25, 75);
            ctx.stroke();
            ctx.closePath();
        }
    };

    const drawO = (i, j) => {
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        if(j == 0 && i != 0) {
            ctx.beginPath();
            ctx.arc(`${i}50`, 50, 25, 0, Math.PI * 2)
            ctx.stroke();
            ctx.closePath();
        } else if (j != 0 && i != 0) {
            ctx.beginPath();
            ctx.arc(`${i}50`, `${j}50`, 25, 0, Math.PI * 2)
            ctx.stroke();
            ctx.closePath();
        } else if (j != 0 && i == 0) {
            ctx.beginPath();
            ctx.arc(50, `${j}50`, 25, 0, Math.PI * 2)
            ctx.stroke();
            ctx.closePath();
        } else {
            ctx.beginPath();
            ctx.arc(50, 50, 25, 0, Math.PI * 2)
            ctx.stroke();
            ctx.closePath();
        }
    };

    let header = document.querySelector('.game-over > h1');
    let gameOverContainer = document.querySelector('.game-over');
    let startGameContainer = document.querySelector('.game-start')
    let whosTurnMessage = document.querySelector('.whos-turn');

    const showGameWinner = (player) => {
        gameOverContainer.classList.toggle('hide');
        header.textContent = `${player.name} has WON!`;
    };

    const showTie = () => {
        gameOverContainer.classList.toggle('hide');
        header.textContent = `It's a TIE!`;
    };

    const startGame = (player) => {
        startGameContainer.classList.toggle('hide');
        whosTurnMessage.classList.toggle('hide');
        whosTurnMessage.innerHTML = `It's <span class="text-primary">${player.name}'s</span> Turn using <span class="text-primary">${player.marker}</span>`
    }

    const whosTurn = (player) => {
        whosTurnMessage.innerHTML = ""
        whosTurnMessage.innerHTML = `It's <span class="text-primary">${player.name}'s</span> Turn using <span class="text-primary">${player.marker}</span>`
    }

    return {
        drawBoard,
        drawX,
        drawO,
        showGameWinner,
        showTie,
        startGame,
        whosTurn
    }
})();

// FACTORY FUNCTION: Player
const player = (name, marker) => {

    return {
        name,
        marker,
    };
};

displayController.drawBoard();

let currentPlayer;
let playerOne;
let playerTwo;

// EVENT: Starting the game
document.querySelector('.start-game').addEventListener('click', () => {
    let playerOneName = document.querySelector('.player-one > input').value;
    let playerTwoName = document.querySelector('.player-two > input').value;
    
    let playerOneMarker = document.querySelector('#player-one-select').value;
    let playerTwoMarker = document.querySelector('#player-two-select').value;

    if (playerOneName == "" || playerTwoName == "") {
        alert("Please fill out a name");
    } else if (playerOneMarker == playerTwoMarker) {
        alert("Please choose either X or O, not both.")
    } else {
        playerOne = player(playerOneName, playerOneMarker);
        playerTwo = player(playerTwoName, playerTwoMarker);

        currentPlayer = playerOne

        displayController.startGame(currentPlayer);
    }
})

// EVENT: Placing marker on the game board
canvas.addEventListener('click', (location) => {
    
    let i = gameBoard.convertCoordinates(location)[0];
    let j = gameBoard.convertCoordinates(location)[1];

    if (currentPlayer.marker == "X") {
        if (gameBoard.valueExists(i,j) == "") {
            displayController.drawX(i,j)
            board[j][i] = "X";  

            let winner = gameBoard.checkForWinner(board, currentPlayer);
            let tie = gameBoard.checkForTie(board);

            if (winner) {
                displayController.showGameWinner(currentPlayer)
            } else if (tie) {
                displayController.showTie()
            } else {
                currentPlayer.marker == playerOne.marker ? currentPlayer = playerTwo : currentPlayer = playerOne;
                displayController.whosTurn(currentPlayer);
            }
        };

    } else if (currentPlayer.marker == "O") {
        if (gameBoard.valueExists(i,j) == "") {
            displayController.drawO(i,j);
            board[j][i] = "O";

            let winner = gameBoard.checkForWinner(board, currentPlayer);
            let tie = gameBoard.checkForTie(board);

            if (winner) {
                displayController.showGameWinner(currentPlayer)
            } else if (tie) {
                displayController.showTie()
            } else {
                currentPlayer.marker == playerOne.marker ? currentPlayer = playerTwo : currentPlayer = playerOne;
                displayController.whosTurn(currentPlayer);
            }
        }
    }
});