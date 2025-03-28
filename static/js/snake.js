        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const box = 50; // Zwiększono rozmiar segmentów
        const canvasSize = 1000;
        let snake = [{ x: 200, y: 200 }];
        let direction = "RIGHT";
        let food = generateFood("green");
        let blueFood = null;
        let score = 0;
        let redWall = null;
        let gameInterval;
        let blueFoodTimer;
        let redWallTimer;

        document.addEventListener("keydown", changeDirection);

        function changeDirection(event) {
            const key = event.keyCode;
            if (key === 37 && direction !== "RIGHT") direction = "LEFT";
            else if (key === 38 && direction !== "DOWN") direction = "UP";
            else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
            else if (key === 40 && direction !== "UP") direction = "DOWN";
        }

        function generateFood(color) {
            return {
                x: Math.floor(Math.random() * (canvasSize / box)) * box,
                y: Math.floor(Math.random() * (canvasSize / box)) * box,
                color: color
            };
        }

        function generateRedWall() {
            const sides = ["TOP", "BOTTOM", "LEFT", "RIGHT"];
            redWall = sides[Math.floor(Math.random() * sides.length)];
            setTimeout(() => redWall = null, 10000);
        }

        function move() {
            let head = { ...snake[0] };
            if (direction === "LEFT") head.x -= box;
            if (direction === "RIGHT") head.x += box;
            if (direction === "UP") head.y -= box;
            if (direction === "DOWN") head.y += box;

            if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
                if (redWall && ((head.x < 0 && redWall === "LEFT") || (head.x >= canvasSize && redWall === "RIGHT") ||
                    (head.y < 0 && redWall === "TOP") || (head.y >= canvasSize && redWall === "BOTTOM"))) {
                    alert("Game Over!");
                    clearInterval(gameInterval);
                    return;
                } else {
                    if (head.x < 0) head.x = 0;
                    if (head.x >= canvasSize) head.x = canvasSize - box;
                    if (head.y < 0) head.y = 0;
                    if (head.y >= canvasSize) head.y = canvasSize - box;
                }
            }

            if (head.x === food.x && head.y === food.y) {
                score++;
                food = generateFood("green");
            } else {
                snake.pop();
            }

            if (blueFood && head.x === blueFood.x && head.y === blueFood.y) {
                score = Math.max(0, score - 1);
                snake.pop();
                blueFood = null;
            }

            snake.unshift(head);
            draw();
        }

        function draw() {
            ctx.clearRect(0, 0, canvasSize, canvasSize);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvasSize, canvasSize);

            if (redWall) {
                ctx.fillStyle = "red";
                if (redWall === "TOP") ctx.fillRect(0, 0, canvasSize, box);
                if (redWall === "BOTTOM") ctx.fillRect(0, canvasSize - box, canvasSize, box);
                if (redWall === "LEFT") ctx.fillRect(0, 0, box, canvasSize);
                if (redWall === "RIGHT") ctx.fillRect(canvasSize - box, 0, box, canvasSize);
            }

            ctx.fillStyle = food.color;
            ctx.fillRect(food.x, food.y, box, box);

            if (blueFood) {
                ctx.fillStyle = "blue";
                ctx.fillRect(blueFood.x, blueFood.y, box, box);
            }

            ctx.fillStyle = "lime";
            snake.forEach(segment => ctx.fillRect(segment.x, segment.y, box, box));

            ctx.fillStyle = "white";
            ctx.font = "40px Arial";
            ctx.fillText("Score: " + score, 20, 50);
        }

        gameInterval = setInterval(move, 200);
        setInterval(() => {
            if (!blueFood) {
                blueFood = generateFood("blue");
                blueFoodTimer = setTimeout(() => blueFood = null, 10000);
            }
        }, Math.random() * 5000 + 13000);

        setInterval(() => {
            if (!redWall) {
                generateRedWall();
            }
        }, Math.random() * 12000 + 1000);