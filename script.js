const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const boxSize = 20;
const canvasSize = canvas.width;
const maxBoxes = canvasSize / boxSize;
let snake = [];
let apple;
let score = 0;
let d;
let game;

function startGame() {
    snake = [{ x: 10, y: 10 }];
    score = 0;
    d = 'RIGHT';
    createApple();
    document.getElementById('score').innerText = score;
    document.getElementById('restartButton').style.display = 'none';
    game = setInterval(draw, 100);
}

function createApple() {
    apple = {
        x: Math.floor(Math.random() * maxBoxes),
        y: Math.floor(Math.random() * maxBoxes)
    };
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'blue' : 'white';
        ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * boxSize, apple.y * boxSize, boxSize, boxSize);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === 'RIGHT') snakeX++;
    if (d === 'LEFT') snakeX--;
    if (d === 'UP') snakeY--;
    if (d === 'DOWN') snakeY++;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= maxBoxes || snakeY >= maxBoxes || collision(newHead, snake)) {
        clearInterval(game);
        document.getElementById('restartButton').style.display = 'block';
        return;
    }

    snake.unshift(newHead);

    if (snakeX === apple.x && snakeY === apple.y) {
        score += 10;
        document.getElementById('score').innerText = score;
        createApple();
        let tail;
if (d === 'RIGHT') tail = { x: snakeX - 1, y: snakeY };
if (d === 'LEFT') tail = { x: snakeX + 1, y: snakeY };
if (d === 'UP') tail = { x: snakeX, y: snakeY + 1 };
if (d === 'DOWN') tail = { x: snakeX, y: snakeY - 1 };
snake.push(tail); // להוסיף חלק חדש במקום התפוח

        if (score % 100 === 0) {
            clearInterval(game);
            game = setInterval(draw, 100 - (score / 10));
        }
    } else {
        snake.pop();
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode === 37 && d !== 'RIGHT') d = 'LEFT';
    if (event.keyCode === 38 && d !== 'DOWN') d = 'UP';
    if (event.keyCode === 39 && d !== 'LEFT') d = 'RIGHT';
    if (event.keyCode === 40 && d !== 'UP') d = 'DOWN';
}

startGame();
