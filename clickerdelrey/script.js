'use strict';

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
		this.radius = App.random(30, 100);
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
			game.figures[game.figures.length-1].increase(1);
		}
	}
};

class Box extends Figure {
	constructor() {
		super();
		this.width = App.random(30, 100);
		this.height = App.random(30, 100);
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
            game.figures[game.figures.length-1].increase(3);
		}
	}
}

class Picture extends Figure {
	constructor() {
		super();
		this.picture = new Image();
		this.picture.src = `pic${App.random(0,2)}.png`;
	}
	
	draw() {
		ctx.drawImage(this.picture, this.x, this.y, 100, 150);
	}
	
	onclick(x, y) {
        if(x >= this.x && x <= this.x + 150 && y >= this.y && y <= this.y + 150) {
            ctx.clearRect(this.x, this.y, 150, 150);
            this.x = App.random(0, canvas.width);
            this.y = App.random(0, canvas.height);
            game.figures[game.figures.length-1].increase(10);
        }

	}
}


class Score extends Figure{
	constructor() {
		super();
		this.value = 0;
		this.step = 1;
	}
	
	increase(step = 1) {
		this.value += step;
		ctx.clearRect(0, 0, canvas.width, 50);
	}
	
	draw() {
		ctx.beginPath();
		ctx.font = "24px Times New Roman";
		ctx.fillStyle = "#fff";
		ctx.fillText(`Счёт: ${this.value}`, canvas.width/2 - 45, 31);
		ctx.closePath();
	}

	onclick() {
		
	}
};


canvas.addEventListener("click", (e) => {
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
            new Box(), new Box(),  new Box(), new Box(),
            new Score()];
	}

    static random(min, max) {
        return min+Math.round(Math.random()*(max-min));
    }

	draw() {
        for (let i = 0; i < this.figures.length; i++) {
            this.figures[i].draw();
        }
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