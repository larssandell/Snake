const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// ctx.fillRect(100, 100, 50, 50);

// for (let i = 0; i < 6; i++) {
//     for (let l = 0; l < 6; l++) {
//         ctx.fillRect(i * 100, l * 100, 50, 50);
//     }
// }

// document.addEventListener("keydown", (e) => console.log(e.key));
// document.addEventListener("keydown", (e) => console.log(e));

let unitSize = 25;

let lastDirectionX = 0;
let lastDirectionY = 0;

let snake = {
    x: 0,
    y: 0,
    directionX: 0,
    directionY: 0,
    bodyX: [],
    bodyY: [],
};
let apple = {
    x: 250,
    y: 250,
};

let score = 0;

ctx.fillRect(snake.x, snake.y, unitSize, unitSize);
document.addEventListener("keydown", move);

function move(e) {
    switch (e.key) {
        case "ArrowLeft":
            if (!lastDirectionX) {
                snake.directionX = -1;
                snake.directionY = 0;
            }
            break;
        case "ArrowUp":
            if (!lastDirectionY) {
                snake.directionX = 0;
                snake.directionY = -1;
            }
            break;
        case "ArrowRight":
            if (!lastDirectionX) {
                snake.directionX = 1;
                snake.directionY = 0;
            }
            break;
        case "ArrowDown":
            if (!lastDirectionY) {
                snake.directionX = 0;
                snake.directionY = 1;
            }
            break;
        default:
            break;
    }
}

let speed = 10;
let count = 0;
// let time = 100;
setInterval(gameLoop, 15);

function gameLoop() {
    if (count >= speed) {
        game();
        count = 0;
    } else {
        count++;
    }
}
function game() {
    eatApple();
    snake.x += snake.directionX * unitSize;
    snake.y += snake.directionY * unitSize;
    lostCheck();
    draw();
    lastDirectionX = snake.directionX;
    lastDirectionY = snake.directionY;
}

function draw() {
    ctx.clearRect(0, 0, 600, 600);
    // eplet
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, unitSize, unitSize);
    // slangen
    ctx.fillStyle = "green";
    ctx.fillRect(snake.x, snake.y, unitSize, unitSize);
    // draw kroppen
    for (let i = 0; i < snake.bodyX.length; i++) {
        ctx.fillRect(snake.bodyX[i], snake.bodyY[i], unitSize, unitSize);
    }
}

function eatApple() {
    if (snake.x === apple.x && snake.y === apple.y) {
        // console.log("eat apple");
        score++;
        document.querySelector(".score").innerHTML = `Score: ${score}`;
        grow();
        if (speed > 3) {
            speed--;
        }
        // if (!score % 2 && speed > 5) {
        //     speed--;
        // }
        do {
            apple.x = parseInt(Math.random() * 24) * unitSize;
            apple.y = parseInt(Math.random() * 24) * unitSize;
        } while (eatCheck());
    } else {
        moveBody();
    }
}

function grow() {
    snake.bodyX = [snake.x].concat(snake.bodyX);
    snake.bodyY = [snake.y].concat(snake.bodyY);
}

function moveBody() {
    if (snake.bodyX.length > 1) {
        for (let i = snake.bodyX.length - 1; i > 0; i--) {
            // beveg kroppen med hodet
            snake.bodyX[i] = snake.bodyX[i - 1];
            snake.bodyY[i] = snake.bodyY[i - 1];
        }
    }

    if (snake.bodyX.length > 0) {
        snake.bodyX[0] = snake.x;
        snake.bodyY[0] = snake.y;
    }
}

function collisionCheck() {
    for (let i = 0; i < snake.bodyX.length; i++) {
        if (snake.bodyX[i] === snake.x && snake.bodyY[i] === snake.y) {
            console.log("Colided with self");
            return true;
        }
    }
    return false;
}

function eatCheck() {
    for (let i = 0; i < snake.bodyX.length; i++) {
        if (snake.bodyX[i] === apple.x && snake.bodyY[i] === apple.y) {
            console.log("bad position");
            return true;
        }
    }
    return false;
}

function lostCheck() {
    if (snake.y < 0 || snake.y > 575 || snake.x < 0 || snake.x > 575) {
        lost();
    }
    if (collisionCheck()) {
        lost();
    }
}

function lost() {
    alert("Game Over");
    snake.x = 0;
    snake.y = 0;
    snake.directionX = 0;
    snake.directionY = 0;
    snake.bodyX = [];
    snake.bodyY = [];
    score = 0;
    document.querySelector(".score").innerHTML = `Score: ${score}`;
}
