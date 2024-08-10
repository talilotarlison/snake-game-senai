const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 32; // Tamanho de cada quadrado do grid
canvas.width = 16 * box;
canvas.height = 16 * box;

// Carrega imagens
const ground = "#000"; // Cor de fundo do jogo
const foodImg = "#f00"; // Cor da comida

// Cria a cobrinha
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};

// Cria a comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

// Pontuação
let score = 0;

// Direção da cobrinha
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Colisão com a própria cobrinha
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Função principal que desenha o jogo
function draw() {
    ctx.fillStyle = ground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "#00ff00" : "#ffffff";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "#000";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = foodImg;
    ctx.fillRect(food.x, food.y, box, box);

    // Posição antiga da cabeça
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Direção da cobrinha
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // Verifica se a cobrinha comeu a comida
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        };
    } else {
        snake.pop(); // Remove o último bloco da cobrinha
    }

    // Adiciona nova cabeça
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Fim de jogo
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    // Desenha o texto da pontuação
    ctx.fillStyle = "#fff";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);
