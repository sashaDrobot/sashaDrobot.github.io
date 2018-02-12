
var canvas = document.getElementById("myCanvas"); // создать переменную для работы с канвасом и получить его из dom по id
var ctx = canvas.getContext("2d"); // получить двумерный контекст

//кирпичи
var brickRowCount = 10;  //количество строк для кирпичей
var brickColumnCount = 12; //количество столбцов для кирпичей
var brickWidth = 75; //ширина кирпича
var brickHeight = 20; //высота кирпича
var brickPadding = 5; //отступ между кирпичами
var brickOffsetTop = 30; //смещение сверху
var brickOffsetLeft = 20; //смещение слева
var bricks = []; //массив для хранения значений кирпичей
var j = 0; // индекс кирпича

//мячь
var ballRadius = 10; // создать переменную радиуса круга и задать его значение
var x = canvas.width/2;  // создать переменную координаты x и установить начальной ей значение
var y = canvas.height-50;  // создать переменную координаты y и установить начальной ей значение
var dx = 2; //создать переменную для изменения координаты x
var dy = -3; //создать переменную для изменения координаты y

//платформа
var paddleHeight = 12;
var paddleWidth = 80;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleStep = 6;
var colorPaddle = 0;
var rightPressed = false;
var leftPressed = false;

//панель
var score = 0;
var lives = 10;
var panelHeight = 20;

function randomColor() { //функция для создания рандомного цвета
    var color = "#"; //переменная цвета с первоначальным значением
    for(var i = 0; i < 6; i++){
        color += Math.round(Math.random() * 15).toString(16); //создаётся и суммируется случайное значение 0-9 и A-F
    }
    return color;
}

var arrayColor = []; //создание массива цветов
for (var i = 0; i < 120; i++) { //цикл прохождения по массиву
    arrayColor[i] = randomColor(); //присваивается значение для массива из вызваной функции
}

function bonusBrick() {
    var randX;
    var randY;

    for(i = 0; i < Math.random()*11; i++) {
        randX = Math.round(Math.random() * 11);
        randY = Math.round(Math.random() * 9);
        bricks[randX][randY].bonus = 1;
        bricks[randX][randY].color = "#f00";
    }
    for(i = 0; i < Math.random()*11; i++) {
        randX = Math.round(Math.random() * 11);
        randY = Math.round(Math.random() * 9);
        bricks[randX][randY].bonus = 2;
        bricks[randX][randY].color = "#00f";
    }
}

//создать кирпичи
for(c = 0; c < brickColumnCount; c++) { //цикл прохождения по столбцам
    bricks[c] = [];//делается двумерный массив
    for(r = 0; r < brickRowCount; r++) { //цикл прохождения по строкам
        bricks[c][r] = { x: 0, y: 0, status: 1, color: arrayColor[j], bonus: 0}; //заполняются парпаметры массива
        bricks[c][r].x = (c*(brickWidth + brickPadding)) + brickOffsetLeft; //координата x положения кирпича
        bricks[c][r].y = (r*(brickHeight + brickPadding)) + brickOffsetTop; //координата y положения кирпича
        j++; //увеличения индекса кирпича
    }
}
bonusBrick(); //добавить бонусы

function collisionDetection() { //функция проверки столкновений
    for(c = 0; c < brickColumnCount; c++) { //прохождения по колонкам
        for(r = 0; r < brickRowCount; r++) { //прохождение по строкам
            var b = bricks[c][r]; //создание переменной и присваивание ей значение объекта кирпича
            if(b.status == 1) { //проверка статуса, отображается ли кирпич
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){ //проверка находится ли центр мяча внутри кирпича
                    dy = -dy; //изменение направления мяча вниз
                    if (b.bonus == 1) {
                        lives++;
                    }
                    if (b.bonus == 2) {
                        score += 2;
                    }
                    b.status = 0; //изменение статуса кирпича, чтобы он не рисовался
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        if(document.cookie.split('=')[1] < score) {
                            document.cookie = "highscore=" + score;
                        }
                        clearInterval(interval);
                        alert("YOU WIN, CONGRATULATIONS!\n" + "Your score: " + score + "\nHigh score: " + document.cookie.split('=')[1]);
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function touchPaddle() {
    if(y + dy > canvas.height-ballRadius-paddleHeight) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            colorPaddle = Math.round(Math.random()*15);
        }
        else if(y + dy > canvas.height - ballRadius) {
            lives--;
            if (!lives) {
                if(document.cookie.split('=')[1] < score) {
                    document.cookie = "highscore=" + score;
                }
                clearInterval(interval);
                alert("GAME OVER!\n" + "Your score: " + score + "\nHigh score: " + document.cookie.split('=')[1]);
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-50;
                dx = 2;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
}

function drawPanel() {
    ctx.beginPath(); //начать рисовать
    ctx.rect(0, 0, canvas.width, panelHeight);
    ctx.fillStyle = "#c6c7ca"
    ctx.fill();
    ctx.closePath(); //закончить рисовать
}

function drawBricks() { //функция для рисования кирпичей
    for(c = 0; c < brickColumnCount; c++) { //цикл прохождения по колонкам
        for(r = 0; r < brickRowCount; r++) { //цикл прохождения по строкам
            if(bricks[c][r].status == 1) { //проверка статуса, нужно ли рисавать этот кирпич
                ctx.beginPath(); //начать рисовать
                ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight); //нарисовать кирпич
                ctx.fillStyle = bricks[c][r].color; //задать цвет
                ctx.fill(); //залить цветом кирпич (прямоугольник)
                ctx.closePath(); //закончить рисовать
            }
        }
    }
}

function drawBall() { //функция для рисования мяча
    ctx.beginPath(); //начать рисовать на канвасе
    ctx.arc(x, y, ballRadius, 0, Math.PI*2); //нарисовать круг
    ctx.fillStyle = "#dd0010"; // задать цвет (стиль) заливки
    ctx.fill(); // залить элемент
    ctx.closePath(); // закончить рисовать на канвасе
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = arrayColor[colorPaddle];
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "14px Arial";
    ctx.fillStyle = "#100495";
    ctx.fillText("Score: "+score, 10, 15);
}

function drawLives() {
    ctx.font = "14px Arial";
    ctx.fillStyle = "#cc0000";
    ctx.fillText("Lives: "+lives, 935, 15);
}

function drawHighScore() {
    ctx.font = "14px Arial";
    highscore = document.cookie.split('=')[1];
    ctx.fillStyle = "#bf7c31";
    ctx.fillText("High Score: "+highscore, 85, 15);
}

function draw() { //функция, которая рисует на канвасе
    ctx.clearRect(0, 0, canvas.width, canvas.height); //очистить канвас

    drawPanel();
    drawPaddle();
    drawScore();
    drawLives();
    drawHighScore();
    drawBricks(); //вызов функции для рисования кирпичей
    drawBall(); //вызов функции для рисования мяча
    collisionDetection(); //вызов функции для убирания кирпичей

    if(rightPressed) {
        if(paddleX <= canvas.width-paddleWidth-paddleStep) {
            paddleX += paddleStep;
        }
    }
    else if(leftPressed) {
        if(paddleX >= paddleStep) {
            paddleX -= paddleStep;
        }
    }

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) { // условие проверки правой и левой границы канваса
        // при координатах x элемента больших ширины канваса без радиуса элемента или при координатах меньше радиуса элемента
        // направление передвижения по оси x  меняется на противоположное
        dx = -dx; // изменение направления движения на противоположное
    }

    if (y + dy < ballRadius + panelHeight) { // условие проверки верхней границы канваса
        // при координатах y элемента больших высоты канваса без радиуса элемента или при координатах меньше радиуса элемента
        // направление передвижения по оси y  меняется на противоположное
        dy = -dy; // изменение направления движения на противоположное
    }

    touchPaddle();

    x += dx; // увеличить координату x на величину изменения для передвижения элемента
    y += dy; // увеличить координату y на величину изменения для передвижения элемента
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;

        if(paddleX > canvas.width-paddleWidth) {
            paddleX = canvas.width-paddleWidth;
        }
        else if(paddleX < 0) {
            paddleX = 0;
        }

    }

}

var interval = setInterval(draw, 10); //установить интервал повторения вызова функции drow