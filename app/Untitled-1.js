(function() {
  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }
  function setupCanvas(canvas) {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    return ctx;
  }
  var canvas = document.getElementById("myCanvas"),
    ctx = setupCanvas(canvas),
    w = canvas.clientWidth,
    h = canvas.clientHeight,
    centerX = (w * 2) / 3,
    centerY = (h * 2) / 3,
    starCount = 720,
    stars = [];
  function Star(x, y, cx, cy) {
    this.x = x;
    this.y = y;
    this.cx = cx;
    this.cy = cy;
    var angle = -1;
    var dx = cx - x,
      dy = cy - y;
    this.radius = Math.sqrt(dx * dx + dy * dy);
    this.hue = random(0, 1) > 0.5 ? random(0, 80) : random(160, 260);
    this.alpha = -1;
    this.alphaDecay = random(0.001, 0.015);
    this.alphaMax = random(0, 1);
    this.coordinates = [];
    this.coordinateCount = 15;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.draw = function() {
      ctx.strokeStyle = "hsla(" + this.hue + ", 80%, " + random(80, 100) + "%, " + this.alpha + ")";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      if (this.radius > 100) {
        this.createPolygonalStar(this.x, this.y, 8, 1, 12, 45, 0, this.hue, this.alpha);
      }
    };
    this.createPolygonalStar = function(x, y, n, r, R, rotation, borderWidth, hue, alpha, isFilled = true) {
      ctx.save();
      ctx.fillStyle = "hsla(" + hue + ", 80%, 60%, " + alpha + ")";
      ctx.lineWidth = borderWidth;
      ctx.beginPath();
      for (var i = 0; i < n; i++) {
        var perDeg = 360 / n;
        var degA = perDeg / 2 / 2;
        var degB = 360 / (n - 1) / 2 - degA / 2 + degA;
        ctx.lineTo(
          Math.cos(((degA + perDeg * i - rotation) / 180) * Math.PI) * R +
            (x - R) +
            borderWidth +
            R * Math.cos((degA / 180) * Math.PI),
          -Math.sin(((degA + perDeg * i - rotation) / 180) * Math.PI) * R + (y - R) + borderWidth + R
        );
        ctx.lineTo(
          Math.cos(((degB + perDeg * i - rotation) / 180) * Math.PI) * r +
            (x - R) +
            borderWidth +
            R * Math.cos((degA / 180) * Math.PI),
          -Math.sin(((degB + perDeg * i - rotation) / 180) * Math.PI) * r + (y - R) + borderWidth + R
        );
      }
      ctx.closePath();
      if (!!isFilled) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
      ctx.restore();
    };
    this.update = function() {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);
      this.x = this.cx + Math.sin(angle) * this.radius;
      this.y = this.cy + Math.cos(angle) * this.radius;
      this.radius += 0.05;
      if (this.alpha <= this.alphaMax) {
        this.alpha += this.alphaDecay;
      }
      angle += 0.01;
    };
  }
  function loop() {
    requestAnimFrame(loop);
    ctx.save();
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = "rgba(0,0,0,.8)";
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
    if (stars.length < starCount) {
      stars.push(new Star(random(0, w), centerY, centerX, centerY));
    }
    var i = stars.length;
    while (i--) {
      stars[i].draw();
      stars[i].update();
      if (stars[i].radius > 400) {
        stars.splice(i, 1);
      }
    }
  }
  window.onload = loop;
})();
