document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('ticTacToeBoard');
    const resultModal = document.getElementById('resultModal');
    const resultText = document.getElementById('resultText');
    const newGameBtn = document.getElementById('newGameBtn');
    const currentPlayerText = document.getElementById('currentPlayerText');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkTie() {
        return gameBoard.every(cell => cell !== '');
    }

    function showResult(result) {
        resultText.textContent = result === 'Tie' ? 'It\'s a Tie!' : `Player ${result} wins!`;
        resultModal.style.display = 'block';
    }

    function handleClick(index) {
        if (!gameActive || gameBoard[index] !== '') {
            return;
        }

        gameBoard[index] = currentPlayer;
        renderBoard();

        const winner = checkWinner();
        if (winner) {
            showResult(winner);
            gameActive = false;
        } else if (checkTie()) {
            showResult('Tie');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerText.textContent = `Current Player: ${currentPlayer}`;
        }
    }

    function renderBoard() {
        board.innerHTML = '';
        gameBoard.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = value;
            cell.addEventListener('click', () => handleClick(index));
            board.appendChild(cell);
        });
    }

    newGameBtn.addEventListener('click', () => {
        resultModal.style.display = 'none';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        currentPlayerText.textContent = `Current Player: ${currentPlayer}`;
        renderBoard();
    });

    currentPlayerText.textContent = `Current Player: ${currentPlayer}`;
    renderBoard();
});
