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
  var target = Math.floor((new Date("2020/6/7 0:00") - Date.now()) / (24 * 60 * 60 * 1000)) + 1;
  var num = random(target + 100, 999);
  return { target: target, num: num };
}
