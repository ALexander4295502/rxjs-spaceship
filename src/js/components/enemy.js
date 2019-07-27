import { Observable } from "rxjs";

import { canvas } from "./canvas";
import { drawTriangle, getRandomInt, isVisible } from "../Helpers.js";
import {
  ENEMY,
  DIRECTION,
  ENEMY_FREQ,
  SHOOTING_SPEED,
  ENEMY_SHOOTING_FREQ
} from "../Constants";

function paintEnemies(enemies) {
  enemies.forEach(enemy => {
    enemy.y += 5;
    enemy.x += getRandomInt(-15, 15);

    if (!enemy.isDead) {
      drawTriangle(enemy.x, enemy.y, ENEMY.SIZE, ENEMY.COLOR, DIRECTION.DOWN);
    }

    enemy.shots.forEach(shot => {
      shot.y += SHOOTING_SPEED;
      drawTriangle(shot.x, shot.y, 5, ENEMY.SHOT_COLOR, DIRECTION.DOWN);
    });
  });
}

const Enemies$ = Observable.interval(ENEMY_FREQ).scan(enemyArray => {
  const enemy = {
    x: parseInt(Math.random() * canvas.width, 10),
    y: -30,
    shots: []
  };

  Observable.interval(ENEMY_SHOOTING_FREQ).subscribe(() => {
    if (!enemy.isDead) {
      enemy.shots.push({ x: enemy.x, y: enemy.y });
    }
    enemy.shots = enemy.shots.filter(isVisible);
  });

  enemyArray.push(enemy);
  return enemyArray
    .filter(isVisible)
    .filter(enemy => !(enemy.isDead && enemy.shots.length === 0));
}, []);

export { Enemies$, paintEnemies };
