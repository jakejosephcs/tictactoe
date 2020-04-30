const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let board = [["", "", ""], ["", "", ""], ["", "", ""]];

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

const gameBoard = (() => {
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

    const winnerLine = (iStart,jStart, iEnd, jEnd) => {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(iStart, jStart);
        ctx.lineTo(iEnd, jEnd);
        ctx.stroke();
        ctx.closePath();
    };

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

    const convertBoardTo1D = (board) => {
        let convertedBoard = [];
        for (let i = 0; i < board.length; i++) {
            convertedBoard = convertedBoard.concat(board[i])
        }
        return convertedBoard;
    }

    const checkForTie = (board) => {
        
    
    }

    return {
        drawBoard,
        drawX,
        drawO,
        winnerLine,
        convertCoordinates,
        valueExists,
        checkForWinner,
        checkForTie,
    }

})();

const displayController = (() => {

    const showGameWinner = (player) => {
        alert(`${player.name} has WON!`);
        location.reload(); 
    };

    const showTie = () => {
        alert("It's a TIE!");
        location.reload(); 
    };

    return {
        showGameWinner,
        showTie
    }
})();

const player = (name, marker) => {

    return {
        name,
        marker,
    };
};

gameBoard.drawBoard();

const jake = player("Jake", "X");
const pc = player("PC", "O")

let currentPlayer = jake


canvas.addEventListener('click', (location) => {
    
    let i = gameBoard.convertCoordinates(location)[0];
    let j = gameBoard.convertCoordinates(location)[1];

    if (currentPlayer.marker == "X") {
        if (gameBoard.valueExists(i,j)) return;
        gameBoard.drawX(i,j);
        board[j][i] = "X";
        let tie = gameBoard.checkForTie(board);
        if (tie) displayController.showTie();
        let winner = gameBoard.checkForWinner(board, currentPlayer);
        winner ? displayController.showGameWinner(currentPlayer) : currentPlayer = pc
    } else if (currentPlayer.marker == "O") {
        if (gameBoard.valueExists(i,j)) return;
        gameBoard.drawO(i,j);
        board[j][i] = "O";
        let tie = gameBoard.checkForTie(board);
        if (tie) displayController.showTie();
        let winner = gameBoard.checkForWinner(board, currentPlayer);
        winner ? displayController.showGameWinner(currentPlayer) : currentPlayer = jake;
    }

})
