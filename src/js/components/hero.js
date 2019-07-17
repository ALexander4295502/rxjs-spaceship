import { Observable } from "rxjs";

import { canvas } from "./canvas";
import { drawTriangle } from "../Helpers";
import { HERO_Y, SPACESHIP, DIRECTION } from "../Constants";

const mouseMove = Observable.fromEvent(canvas, "mousemove");
const SpaceShip$ = mouseMove
  .map(event => ({
    x: event.clientX,
    y: HERO_Y
  }))
  .startWith({
    x: canvas.width / 2,
    y: HERO_Y
  });

function paintSpaceShip(x, y) {
  drawTriangle(x, y, SPACESHIP.SIZE, SPACESHIP.COLOR, DIRECTION.UP);
}

export { SpaceShip$, paintSpaceShip };
