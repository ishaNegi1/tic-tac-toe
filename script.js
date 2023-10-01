

const btn = document.getElementById('btn');
btn.addEventListener('click', restartGame);
function restartGame() {
        
    start = true;
    currentPlayer = 'X';
    winBox.style.display = 'none';
    winGif.style.display = 'none';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    subBox.forEach(cell => {
        cell.textContent = '';
    });

    updateTurnText();

}


start = true;
// Add click event listeners to each subBox
const subBox = document.querySelectorAll('.subBox_1');
Array.from(subBox).forEach((box, index) => {
    box.addEventListener('click', play)
    function play() {
        if (start && box.textContent === '') {
            const row = Math.floor(index / 3);
            const col = index % 3;
            makeMove(row, col);
        }
    };
});


let currentPlayer = 'X';
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];


function makeMove(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        subBox[row * 3 + col].textContent = currentPlayer;

        if (checkWinner()) {
            endGame(`${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            drawMatch("It's a tie!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnText();
            if (currentPlayer === 'O') {
                setTimeout(cpuMove, 1000);
            }
        }
    }
}

function checkWinner() {
    const chances = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combination of chances) {
        const [a, b, c] = combination;
        if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
            return true;
        }
    }

    return false;
}

function cpuMove() {
        if (start) {
            const emptyCells = [];
            board.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell === '') {
                        emptyCells.push({ row: rowIndex, col: colIndex });
                    }
                });
            });

            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomMove = emptyCells[randomIndex];
            makeMove(randomMove.row, randomMove.col);
        }
    }

    
    function isBoardFull() {
        return board.every(row => row.every(a => a !== ''));
    }


    const winBox = document.getElementById('win_box');
    const winnerText = document.getElementById('who_win');
    const winGif = document.getElementById('win');


    function endGame(message) {
        start = false;
        winBox.style.display = 'block';
        winnerText.textContent = message;
        winGif.style.display = 'block';
        subTurn.textContent = "";
    }

    function drawMatch(message_1){
        start = false;
        winBox.style.display = 'block';
        winnerText.textContent = message_1;
        winGif.style.display = 'none';
        subTurn.textContent = "";
    }

    const subTurn = document.getElementById('sub_turn');
    function updateTurnText() {
        if (start) {
            subTurn.textContent = currentPlayer;
        }
    }
    updateTurnText();

  
  



