// Criando as variáveis

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Criando o fundo, a cobrinha e a comida

function criarBG() {
    context.fillStyle = "lightyellow";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "brown";
        context.fillRect(snake[i].x, snake[i].y, box, box);       
    }
}

function drawFood() {
    context.fillStyle = "green";
    context.fillRect(food.x, food.y, box, box);
}

// Mudando a cobrinha de direção ao apertar as teclas direcionais

document.addEventListener("keydown", update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Criando o ínicio de jogo

function iniciarJogo() {

    // Permitindo à cobrinha "ultrapassar" a tela

    if(snake[0].x > 15 * box) snake[0].x = 0;
    if(snake[0].x < 0) snake[0].x = 16 * box;
    if(snake[0].y > 15 * box) snake[0].y = 0;
    if(snake[0].y < 0) snake[0].y = 16 * box;

    // Criando a colisão da cobrinha com seu corpo e fim de jogo

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Fim de Jogo :/");
        }
    }

    // Ativando as funções de fundo, cobrinha e comida

    criarBG();
    criarCobrinha();
    drawFood();

    // Dando movimento à cobrinha, permitindo comer e gerando uma nova comida

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Iniciando o jogo

let jogo = setInterval(iniciarJogo, 100);