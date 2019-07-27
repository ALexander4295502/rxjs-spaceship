import { ctx, canvas } from "./components/canvas.js";
import { DIRECTION } from "./Constants.js";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawTriangle(x, y, width, color, direction) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - width, y);
  ctx.lineTo(x, direction === DIRECTION.UP ? y - width : y + width);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x - width, y);
  ctx.fill();
}

function isVisible(obj) {
  return (
    obj.x > -40 &&
    obj.x < canvas.width + 40 &&
    obj.y > -40 &&
    obj.y < canvas.height + 40
  );
}

function collision(target1, target2) {
  return (
    Math.abs(target1.x - target2.x) < 20 && Math.abs(target1.y - target2.y) < 20
  );
}

export { getRandomInt, drawTriangle, isVisible, collision };
