const cells = document.querySelectorAll('.cell');
        const restartBtn = document.getElementById('restartBtn');
        const gameStatus = document.getElementById('gameStatus');

        let currentPlayer = 'X'; // Rozpoczyna gracz X
        let gameBoard = ['', '', '', '', '', '', '', '', '']; // Pusta plansza
        let gameOver = false;

        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Obsługuje kliknięcie na komórkę
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        // Funkcja obsługująca kliknięcie
        function handleCellClick(event) {
            const cellIndex = event.target.dataset.cell;

            if (gameBoard[cellIndex] !== '' || gameOver) return;

            gameBoard[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add('taken');

            if (checkWinner()) {
                gameStatus.textContent = `${currentPlayer} wygrywa!`;
                gameOver = true;
                restartBtn.style.display = 'inline-block';
            } else if (gameBoard.every(cell => cell !== '')) {
                gameStatus.textContent = 'Remis!';
                gameOver = true;
                restartBtn.style.display = 'inline-block';
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        // Sprawdza, czy któryś z graczy wygrał
        function checkWinner() {
            return winningCombinations.some(combination => {
                const [a, b, c] = combination;
                return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
            });
        }

        // Restartuje grę
        restartBtn.addEventListener('click', () => {
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameOver = false;
            currentPlayer = 'X';
            gameStatus.textContent = '';
            restartBtn.style.display = 'none';

            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('taken');
            });
        });