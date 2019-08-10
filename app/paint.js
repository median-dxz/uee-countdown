function setupCanvas(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var ctx = canvas.getContext("2d");

  canvas.width = window.innerHeight * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.borderRadius = window.innerHeight + "px";
  canvas.style.width = window.innerHeight + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.globalAlpha = 0.9;
  ctx.scale(dpr, dpr);
  return ctx;
}
