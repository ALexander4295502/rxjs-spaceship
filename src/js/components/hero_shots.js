import { Observable } from "rxjs";

import { canvas } from "./canvas";
import {
  FIRE_KEY_FREQ,
  SHOOTING_SPEED,
  SHOT,
  DIRECTION,
  HERO_Y,
  SCORE_INCREASE
} from "../Constants";
import { drawTriangle, collision } from "../Helpers";
import { SpaceShip$ } from "./hero";
import { ScoreSubject$ } from "./score";

const playerFiring$ = Observable.merge(
  Observable.fromEvent(canvas, "click"),
  Observable.fromEvent(document, "keydown").filter(evt => evt.keyCode == 32)
)
  .startWith({})
  .sampleTime(FIRE_KEY_FREQ)
  .timestamp();

const HeroShots$ = Observable.combineLatest(
  playerFiring$,
  SpaceShip$,
  (shotEvents, spaceShip) => ({
    timestamp: shotEvents.timestamp,
    x: spaceShip.x
  })
)
  .distinctUntilChanged((shot1, shot2) => shot1.timestamp === shot2.timestamp)
  .scan((shotArray, shot) => {
    shotArray.push({
      x: shot.x,
      y: HERO_Y
    });
    return shotArray;
  }, []);

function paintHeroShots(heroShots, enemies) {
  heroShots.forEach((shot, i) => {
    for (let l = 0; l < enemies.length; l++) {
      const enemy = enemies[l];
      if (!enemy.isDead && collision(shot, enemy)) {
        ScoreSubject$.next(SCORE_INCREASE);
        enemy.isDead = true;
        shot.x = shot.y = -100;
        break;
      }
    }
    shot.y -= SHOOTING_SPEED;
    drawTriangle(shot.x, shot.y, SHOT.SIZE, SHOT.COLOR, DIRECTION.UP);
  });
}

export { paintHeroShots, HeroShots$ };
