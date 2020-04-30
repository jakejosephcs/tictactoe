const gameBoard = (() => {
    let board = [];
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

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

    return {
        drawBoard,
        drawX,
        drawO,
    }

})();

const displayController = (() => {

})();

const player = (name, marker) => {

};

gameBoard.drawBoard();
