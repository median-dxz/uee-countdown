function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arc2deg(arc) {
  return Math.fround((arc / Math.PI) * 180);
}

function deg2arc(deg) {
  return Math.fround((deg / 180) * Math.PI);
}
