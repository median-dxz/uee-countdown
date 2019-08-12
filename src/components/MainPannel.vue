<template>
  <div id="main">
    <canvas id="rings"></canvas>
    <div id="text"></div>
  </div>
</template>

<script>
import TWEEN from "@tweenjs/tween.js";

export default {
  name: "Home",
};
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
const globalAlpha = 0.9;
const globalLineWidth = 2;
const globalSpeed = 10; //deg

function setupCanvas(canvasSrc) {
  var dpr = window.devicePixelRatio || 1;
  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext("2d");

  canvasSrc.width = window.innerHeight * dpr;
  canvasSrc.height = window.innerHeight * dpr;

  canvasSrc.style.borderRadius = window.innerHeight + "px";
  canvasSrc.style.width = window.innerHeight + "px";
  canvasSrc.style.height = window.innerHeight + "px";

  ctx.globalAlpha = globalAlpha;
  ctx.lineCap = "round";
  ctx.imageSmoothingQuality = "high";
  ctx.shadowBlur = 4;

  ctx.scale(dpr, dpr);
  return ctx;
}

function setTween() {
  var day = getUeeDay();
  var pannelOpacity = { v: 0 };

  elText.innerHTML = Math.floor(day.num);

  var tweenFadeIn = new TWEEN.Tween(pannelOpacity);
  tweenFadeIn
    .to({ v: 1 }, 2000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate((obj) => (elMain.style.opacity = obj.v))
    .onComplete(() => tweenFadeIn.stop())
    .start();

  var tweenText = new TWEEN.Tween(day);
  tweenText
    .delay(1000)
    .to({ num: day.target }, 4000)
    .easing(TWEEN.Easing.Circular.Out)
    .onUpdate((obj) => (elText.innerHTML = Math.floor(obj.num)))
    .onComplete(() => tweenText.stop(), (pannelOpacity = { v: 1 }))
    .start();

  var tweenFadeOut = new TWEEN.Tween(pannelOpacity);
  tweenFadeOut
    .delay(8000)
    .to({ v: 0 }, 2000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate((obj) => (elMain.style.opacity = obj.v))
    .onComplete(() => tweenFadeOut.stop())
    .start();
}

function linesDraw() {
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.globalCompositeOperation = "destination-in";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "destination-over";

  for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var item = lines_1[_i];
    item.animate();
  }
}

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
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arc2deg(arc) {
  return Math.fround((arc / Math.PI) * 180);
}

function deg2arc(deg) {
  return Math.fround((deg / 180) * Math.PI);
}

function getUeeDay() {
  var target = Math.floor((new Date("2020/6/7 9:00") - Date.now()) / (24 * 60 * 60 * 1000));
  var num = random(target + 100, 999);
  return { target: target, num: num };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  opacity: 0;
}

#text {
  height: 10rem;
  width: 10rem;
  text-align: center;
  line-height: 10rem;
  z-index: 10;

  font-size: 80px;
  color: #fffe;
  text-shadow: 0px 0px 16px #000000cc, 0 0 24px #ffffffc9;
}

#text::after {
  content: "DAYS";
  bottom: 0;
  right: 0;
  font-size: 24px;
  text-shadow: inherit;
}

#rings {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 80px 80px rgba(0, 0, 0, 0.3);
}
</style>
