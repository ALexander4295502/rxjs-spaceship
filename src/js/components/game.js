import { Observable } from "rxjs";

import { paintStars, StarStream$ } from "./starfield";
import { paintSpaceShip, SpaceShip$ } from "./hero";
import { paintEnemies, Enemies$ } from "./enemy";
import { paintHeroShots, HeroShots$ } from "./hero_shots";
import { SPEED } from "../Constants";

function renderScene(actors) {
  paintStars(actors.stars);
  paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
  paintEnemies(actors.enemies);
  paintHeroShots(actors.heroShots);
}

const Game = Observable.combineLatest(
  StarStream$,
  SpaceShip$,
  Enemies$,
  HeroShots$,
  (stars, spaceship, enemies, heroShots) => ({
    stars,
    spaceship,
    enemies,
    heroShots
  })
).sampleTime(SPEED);

Game.subscribe(renderScene);
