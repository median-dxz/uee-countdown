var elText = document.getElementById("text");
var elMain = document.getElementById("main");

/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("rings");
var ctx = setupCanvas(canvas);

var screenWidth = window.innerHeight;
var screenHeight = window.innerHeight;
var centerPointX = Math.floor(screenWidth / 2);
var centerPointY = Math.floor(screenHeight / 2);

var fontSize = 16;

var lines = [];

var timeLast = null;
var fps = 1000 / 60;

window.onload = () => {
  setTween();

  for (let i = 0; i * 7 + 120 <= screenHeight; i++) {
    let k = new startLines(7*i+120);
    lines.push(k);
    k.drawStart();
  }
  animate();
};

function animate(timeNow) {
  timeLast = timeLast || timeNow;

  if (timeNow - timeLast > fps) {
    timeLast = timeNow;
    linesDraw();
  }

  requestAnimationFrame(animate);
  TWEEN.update();
}

class startLines {
  constructor(_radius) {
    this.positionX = centerPointX;
    this.positionY = centerPointY;
    this.radius = _radius || random(fontSize * 10 + 10, screenHeight / 2);

    // this.red = Math.floor(Math.random() * 155) + 100;
    // this.green = Math.floor(Math.random() * 155) + 100;
    // this.blue = Math.floor(Math.random() * 155) + 100;

    this.opacity = 1;

    this.speed = globalSpeed || deg2arc(random(0, 30));

    this.startRadio = -deg2arc(random(0, 360));
    this.endRadio = this.startRadio + deg2arc(random(45, 90));
  }

  animate() {
    this.startRadio += deg2arc(this.speed) / 60;
    this.endRadio += deg2arc(this.speed) / 60;
    this.drawStart();
  }

  drawStart() {
    // var color = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.opacity + ")";
    var color = "rgba(255,255,255,1)"
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth || globalLineWidth;
    ctx.arc(this.positionX, this.positionY, this.radius, this.startRadio, this.endRadio);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

function recovery(arr, index) {
  var tempArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (i != index) {
      tempArr.push(arr[i]);
    }
  }
  return tempArr;
}
