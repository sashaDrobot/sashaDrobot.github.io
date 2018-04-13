'use strict';

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const time = document.getElementById("time");
const scorediv = document.getElementById("scorediv");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;

class Figure {
	constructor() {
		this.x = App.random(0, canvas.width);
		this.y = App.random(0, canvas.height);
		this.color = `rgb(${App.random(0, 255)},${App.random(0, 255)},${App.random(0, 255)})`;
	}
};

class Ball extends Figure {
	constructor() {
		super();
		this.radius = App.random(30, 90);
		this.bonus = 1;
	}
	
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	
	onclick(x, y) {
		if ((x-this.x)*(x-this.x) + (y-this.y)*(y-this.y) <= this.radius*this.radius) {
			this.color = `rgb(${App.random(0, 255)},${App.random(0, 255)},${App.random(0, 255)})`;
			if (this.radius*this.radius*Math.PI > 10000) {
				this.bonus = 1;
			} else if (this.radius*this.radius*Math.PI > 5000) {
				this.bonus = 2;
			} else  if (this.radius*this.radius*Math.PI > 3000) {
				this.bonus = 3;
			} else if (this.radius*this.radius*Math.PI > 2800) {
				this.bonus = 4;
			}
			game.figures[game.figures.length-1].increase(this.bonus);
		}
	}
};

class Box extends Figure {
	constructor() {
		super();
		this.width = App.random(30, 100);
		this.height = App.random(30, 100);
		this.bonus = 3;
	}
	
	draw() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	
	onclick(x, y) {
		if(x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
			ctx.clearRect(this.x, this.y, this.width, this.height);
			this.x += 10;
			if(this.height*this.width > 9800) {
				this.bonus = 1;
			} else if (this.height*this.width > 5000) {
				this.bonus = 2;
			} else if (this.height*this.width > 2500) {
				this.bonus = 3;
            } else if (this.height*this.width > 1600) {
                this.bonus = 4;
			} else if (this.height*this.width >= 900) {
                this.bonus = 5;
            }
            game.figures[game.figures.length-1].increase(this.bonus);
		}
	}
}

class Picture extends Figure {
	constructor() {
		super();
		this.picture = new Image();
		this.picture.src = `pic${App.random(0,2)}.png`;
		this.width = App.random(100, 200);
		this.height = App.random(180, 360);
		this.bonus = 10;
	}
	
	draw() {
		ctx.drawImage(this.picture, this.x, this.y, this.width, this.height);
	}
	
	onclick(x, y) {
        if(x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
            ctx.clearRect(this.x, this.y, this.width, this.height);
            this.x = App.random(0, canvas.width);
            this.y = App.random(0, canvas.height);
            if(this.height*this.width > 70000) {
                this.bonus = 10;
            } else if (this.height*this.width > 50000) {
                this.bonus = 9;
            } else if (this.height*this.width > 30000) {
                this.bonus = 8;
            } else if (this.height*this.width > 20000) {
                this.bonus = 6;
            } else if (this.height*this.width >= 18000) {
                this.bonus = 5;
            }
            game.figures[game.figures.length-1].increase(this.bonus);
        }

	}
}

class Score extends Figure{
	constructor() {
		super();
	}
	
	increase(step = 1) {
		score += step;
	}
	
	draw() {
		scorediv.innerHTML = `Счёт: ${score}`;
	}

	onclick() {
		
	}
};

class Timer {
    constructor() {
        this.start = new Date();
        this.start.setMinutes(0, 0, 0);
        this.min = 0;
        this.sec = 39;
        this.minutes = "00";
        this.seconds = 39;
    }

    getTime() {
        setInterval( () => {
        	this.draw();
        	this.start.setSeconds(--this.sec);
        	if(this.sec < 0) {
        		this.sec = 60;
        		this.start.setMinutes(--this.min);
			}
        	this.minutes = this.minutes < 10 ? "0" + this.start.getMinutes() : this.start.getMinutes();
            this.seconds = this.seconds < 11 ? "0" + this.start.getSeconds() : this.start.getSeconds();
        	if (this.min < 0) {
                alert(`Время вышло! Ваш счёт: ${score}`);
                document.location.reload();
            }
		}, 1000);
    }

    draw() {
      time.innerHTML = `Осталось времени: ${this.minutes}:${this.seconds}`;
    }

    onclick() {

	}
}

canvas.addEventListener("click", (event) => {
	let rect = canvas.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;
	for(let i = 0; i < game.figures.length; i++) {
		game.figures[i].onclick(x, y);
	}}, false);


class App {
	constructor() {
        this.figures = [
            new Picture(), new Picture(), new Picture(),
            new Ball(), new Ball(), new Ball(), new Ball(),
            new Box(), new Box(),  new Box(), new Box(), new Box(),
			new Score()];
	}

    static random(min, max) {
        return min+Math.round(Math.random()*(max-min));
    }

	run() {
		setInterval(() => {
            for (let i = 0; i < this.figures.length; i++) {
                this.figures[i].draw();
            }}, 10);
	}

};

const game = new App();
game.run();

let t = new Timer();
t.getTime();