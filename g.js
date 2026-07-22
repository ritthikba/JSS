const arrow = document.querySelector(".arrow");
const player = document.querySelector(".player");
const score = document.querySelector(".score");
const gameOverText = document.querySelector(".game-over");

let arrowpositionY = 180;
let arrowpositionX = 650;
let playerpositionY = 180;
let playerpositionX = 10;
let scoreValue = 0;
let gameOver = false;

function updateScore() {
    scoreValue += 1;
    score.textContent = `Score:${scoreValue}`;
}

function endGame() {
    if (gameOver) return;
    gameOver = true;
    gameOverText.classList.add("show");
    clearInterval(gameInterval);
}

function checkCollision() {
    const playerLeft = playerpositionX;
    const playerTop = playerpositionY;
    const playerRight = playerLeft + 50;
    const playerBottom = playerTop + 50;

    return arrowpositionX < playerRight && arrowpositionX + 50 > playerLeft && arrowpositionY < playerBottom && arrowpositionY + 50 > playerTop;
}

let gameInterval = setInterval(() => {
    if (gameOver) return;

    arrowpositionX -= 10;

    if (arrowpositionX < 0) {
        arrowpositionX = 650;
        arrowpositionY = Math.floor(Math.random() * 350);
        updateScore();
    }

    if (checkCollision()) {
        endGame();
        return;
    }

    arrow.style.left = arrowpositionX + "px";
    arrow.style.top = arrowpositionY + "px";
}, 10);

document.addEventListener('keydown', (event) => {
    if (gameOver) return;

    if (event.key === 'ArrowUp') {
        playerpositionY -= 40;
        if (playerpositionY < 0) playerpositionY = 0;
    }

    if (event.key === 'ArrowDown') {
        playerpositionY += 40;
        if (playerpositionY > 350) playerpositionY = 360;
    }

    if (event.key === 'ArrowLeft') {
        playerpositionX -= 40;
        if (playerpositionX < 0) playerpositionX = 0;
    } else if (event.key === 'ArrowRight') {
        playerpositionX += 40;
        if (playerpositionX > 650) playerpositionX = 650;
    }

    player.style.top = playerpositionY + "px";
    player.style.left = playerpositionX + "px";
});