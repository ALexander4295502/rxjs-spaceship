import { Observable } from "rxjs";

import { canvas } from "./canvas";
import { drawTriangle, getRandomInt } from "../Helpers.js";
import { ENEMY, DIRECTION, ENEMY_FREQ } from "../Constants";

function paintEnemies(enemies) {
  enemies.forEach(enemy => {
    enemy.y += 5;
    enemy.x += getRandomInt(-15, 15);
    drawTriangle(enemy.x, enemy.y, ENEMY.SIZE, ENEMY.COLOR, DIRECTION.DOWN);
  });
}

const Enemies$ = Observable.interval(ENEMY_FREQ).scan(enemyArray => {
  const enemy = {
    x: parseInt(Math.random() * canvas.width, 10),
    y: -30
  };

  enemyArray.push(enemy);
  return enemyArray;
}, []);

export { Enemies$, paintEnemies };
