var txt = document.getElementById("text");
var day = { target: Math.floor((new Date("2020/6/7 9:00") - Date.now()) / (24 * 60 * 60 * 1000)), num: null };

/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("rings");
var ctx = canvas.getContext("2d");

var scale = window.devicePixelRatio || 1;

window.onload = () => {
  var tween = new TWEEN.Tween(day);

  day.num = random(day.target + 100, 999);

  tween
    .to({ num: day.target }, 3000)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();

  canvas.width = window.innerHeight * scale;
  canvas.height = window.innerHeight * scale;

  canvas.style.width = window.innerHeight + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.globalAlpha = 0.9;
  ctx.scale(scale, scale); //再来设置比例

  for (let i = 0; i < 60; i++) {
    let k = new startLines();
    lines.push(k);
    k.drawStart();
  }
  animate();
};

function animate() {
  txt.innerHTML = Math.floor(day.num);
  requestAnimationFrame(animate);
  TWEEN.update();
}

var screenWidth = window.innerHeight;
var screenHeight = window.innerHeight;
var centerPointX = Math.floor(screenWidth / 2);
var centerPointY = Math.floor(screenHeight / 2);
var fontSize = 16;

var lines = [];
var alpha = 0;

class startLines {
  constructor() {
    this.positionX = centerPointX;
    this.positionY = centerPointY;
    this.radius = random(fontSize * 10 + 10, screenHeight / 2);

    this.red = Math.floor(Math.random() * 155) + 100;
    this.green = Math.floor(Math.random() * 155) + 100;
    this.blue = Math.floor(Math.random() * 155) + 100;
    // this.opacity = random(40, 100) / 10;
    this.opacity = 1;

    this.lineWidth = 1.5;
    // this.lineWidth = 20;
    this.speed = deg2arc(random(0, 30));

    this.startRadio = -deg2arc(random(0, 360));
    this.endRadio = this.startRadio + deg2arc(random(0, 120));
  }

  animate() {
    this.startRadio += this.speed / 60;
    this.endRadio += this.speed / 60;
    this.drawStart();
  }

  drawStart = function() {
    var color = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.opacity + ")";
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.positionX, this.positionY, this.radius, this.startRadio, this.endRadio);
    ctx.strokeStyle = color;
    ctx.stroke();
  };
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

// setInterval(function() {
//   var starLine = new startLines();
//   lines.push(starLine);
//   starLine.drawStart();
//   for (var i = 0; i < lines.length; i++) {
//     if (lines[i].startRadio > (Math.PI * 3) / 4) {
//       lines = recovery(lines, i);
//     }
//   }
//   if (lines.length > 20) {
//     lines.shift();
//   }
// }, 1000);

setInterval(function() {
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.globalCompositeOperation = "destination-in";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "destination-over";
  for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var item = lines_1[_i];
    item.animate();
  }
}, 20);
