import { Observable } from "rxjs";

import { paintStars, StarStream$ } from "./starfield";
import { paintSpaceShip, SpaceShip$ } from "./hero";
import { paintEnemies, Enemies$ } from "./enemy";
import { paintHeroShots, HeroShots$ } from "./hero_shots";
import { paintScore, Score$ } from "./score";
import { collision } from "../Helpers";
import { SPEED } from "../Constants";

function renderScene(actors) {
  paintStars(actors.stars);
  paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
  paintEnemies(actors.enemies);
  paintHeroShots(actors.heroShots, actors.enemies);
  paintScore(actors.score);
}

function gameOver(ship, enemies) {
  return enemies.some(enemy => {
    return (
      collision(ship, enemy) || enemy.shots.some(shot => collision(ship, shot))
    );
  });
}

const Game = Observable.combineLatest(
  StarStream$,
  SpaceShip$,
  Enemies$,
  HeroShots$,
  Score$,
  (stars, spaceship, enemies, heroShots, score) => ({
    stars,
    spaceship,
    enemies,
    heroShots,
    score
  })
)
  .sampleTime(SPEED)
  .takeWhile(actors => !gameOver(actors.spaceship, actors.enemies));

Game.subscribe(renderScene);
