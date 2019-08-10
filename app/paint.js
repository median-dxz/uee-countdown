const globalAlpha = 0.9;
const globalLineWidth = 1.5;
const globalSpeed = 10;//deg

function setupCanvas(canvas) {
  var dpr = window.devicePixelRatio || 1;
  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext("2d");

  canvas.width = window.innerHeight * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.borderRadius = window.innerHeight + "px";
  canvas.style.width = window.innerHeight + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.globalAlpha = globalAlpha;
  ctx.lineCap = "round";
  ctx.shadowBlur = 15;
  ctx.shadowColor = "rgba(255,255,255,0.8)";

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
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate((obj) => (elText.innerHTML = Math.floor(day.num)))
    .onComplete(() => tweenText.stop(), (pannelOpacity = { v: 1 }))
    .start();

  // var tweenFadeOut = new TWEEN.Tween(pannelOpacity);
  // tweenFadeOut
  //   .delay(8000)
  //   .to({ v: 0 }, 2000)
  //   .easing(TWEEN.Easing.Linear.None)
  //   .onUpdate((obj) => (elMain.style.opacity = obj.v))
  //   .onComplete(() => tweenFadeOut.stop())
  //   .start();
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
