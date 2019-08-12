var elText = null;
var elMain = null;

/** @type {HTMLCanvasElement} */
var canvas = null;
var ctx = null;

var screenWidth = window.innerHeight;
var screenHeight = window.innerHeight;
var centerPointX = Math.floor(screenWidth / 2);
var centerPointY = Math.floor(screenHeight / 2);

var fontSize = 16;

var lines = [];

var timeLast = null;
var fps = 1000 / 40;

window.onload = () => {
  elText = document.getElementById("text");
  elMain = document.getElementById("main");
  canvas = document.getElementById("rings");
  ctx = setupCanvas(canvas);
  for (let i = 0; i * 7 + 160 <= screenHeight / 2; i++) {
    let k = new startLines(7 * i + 160);
    if (!i) {
      k = new startLines(7 * i + 160, 360);
    }

    lines.push(k);
    k.drawStart();
  }

  setTween();
  animate();
};

function animate(timeNow) {
  timeLast = timeLast || timeNow;

  if (timeNow - timeLast > fps) {
    timeLast = timeNow;
    linesDraw();
    TWEEN.update(timeNow);
  }

  requestAnimationFrame(animate);
}

class startLines {
  constructor(_radius, _startRadio) {
    this.positionX = centerPointX;
    this.positionY = centerPointY;
    this.radius = _radius || random(fontSize * 10 + 10, screenHeight / 2);

    this.red = Math.floor(Math.random() * 35) + 220;
    this.green = Math.floor(Math.random() * 35) + 220;
    this.blue = Math.floor(Math.random() * 35) + 220;

    this.opacity = 1;

    this.speed = random(20, 80);

    this.startRadio = -deg2arc(random(0, 360));
    this.endRadio = _startRadio || this.startRadio + deg2arc(random(75, 120));

    // this.direction = random(0, 1);
    this.direction = 1;
  }

  animate() {
    if (this.direction) {
      this.startRadio += deg2arc(this.speed) / 60;
      this.endRadio += deg2arc(this.speed) / 60;
    } else {
      this.startRadio -= deg2arc(this.speed) / 60;
      this.endRadio -= deg2arc(this.speed) / 60;
    }

    this.drawStart();
  }

  drawStart() {
    var color = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.opacity + ")";
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth || globalLineWidth;
    ctx.arc(this.positionX, this.positionY, this.radius, this.startRadio, this.endRadio);
    ctx.strokeStyle = color;
    ctx.shadowColor = "rgba(" + this.red + "," + this.green + "," + this.blue + ",0.8)";
    ctx.stroke();
    ctx.restore();
  }
}
