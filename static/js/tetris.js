const canvas = document.getElementById("tetrisCanvas");
        const ctx = canvas.getContext("2d");
        const gameOverText = document.getElementById("gameOver");
        const ROWS = 20, COLS = 10, SIZE = 30;
        const board = Array.from({ length: ROWS }, () => Array(COLS).fill(""));

        const tetrominoes = [
            { shape: [[1, 1, 1, 1]], color: "cyan", canRotate: true },
            { shape: [[1, 1], [1, 1]], color: "yellow", canRotate: false },
            { shape: [[1, 1, 0], [0, 1, 1]], color: "red", canRotate: true },
            { shape: [[0, 1, 1], [1, 1, 0]], color: "green", canRotate: true },
            { shape: [[1, 1, 1], [0, 1, 0]], color: "purple", canRotate: true },
            { shape: [[1, 1, 1], [1, 0, 0]], color: "blue", canRotate: true },
            { shape: [[1, 1, 1], [0, 0, 1]], color: "orange", canRotate: true }
        ];

        let currentTetromino = getRandomTetromino();
        let posX = 3, posY = 0;
        let gameOver = false;

        function getRandomTetromino() {
            return { ...tetrominoes[Math.floor(Math.random() * tetrominoes.length)] };
        }

        function rotateTetromino() {
            if (!currentTetromino.canRotate) return;
            const newShape = currentTetromino.shape[0].map((_, index) => currentTetromino.shape.map(row => row[index]).reverse());
            if (!collision(0, 0, newShape)) {
                currentTetromino.shape = newShape;
            }
        }

        function drawBoard() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            board.forEach((row, y) => row.forEach((color, x) => {
                if (color) drawSquare(x, y, color);
            }));
        }

        function drawTetromino() {
            currentTetromino.shape.forEach((row, y) => row.forEach((cell, x) => {
                if (cell) drawSquare(posX + x, posY + y, currentTetromino.color);
            }));
        }

        function drawSquare(x, y, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
            ctx.strokeStyle = "black";
            ctx.strokeRect(x * SIZE, y * SIZE, SIZE, SIZE);
        }

        function mergeTetromino() {
            currentTetromino.shape.forEach((row, y) => row.forEach((cell, x) => {
                if (cell) board[posY + y][posX + x] = currentTetromino.color;
            }));
            if (board[0].some(cell => cell)) {
                gameOver = true;
                gameOverText.style.display = "block";
                return;
            }
            currentTetromino = getRandomTetromino();
            posX = 3;
            posY = 0;
        }

        function update() {
            if (gameOver) return;
            if (!collision(0, 1)) {
                posY++;
            } else {
                mergeTetromino();
            }
            drawBoard();
            drawTetromino();
        }

        function collision(offsetX, offsetY, shape = currentTetromino.shape) {
            return shape.some((row, y) => row.some((cell, x) => {
                let newX = posX + x + offsetX;
                let newY = posY + y + offsetY;
                return cell && (newX < 0 || newX >= COLS || newY >= ROWS || board[newY]?.[newX]);
            }));
        }

        document.addEventListener("keydown", event => {
            if (gameOver) return;
            if (event.key === "ArrowLeft" && !collision(-1, 0)) posX--;
            if (event.key === "ArrowRight" && !collision(1, 0)) posX++;
            if (event.key === "ArrowDown" && !collision(0, 1)) posY++;
            if (event.key === "ArrowUp") rotateTetromino();
            drawBoard();
            drawTetromino();
        });

        setInterval(update, 500);