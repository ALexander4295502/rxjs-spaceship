import { canvas } from "./components/canvas";

export const DIRECTION = {
    UP: 'up',
    DOWN: 'down'
}
export const ENEMY_FREQ = 1500;
export const HERO_Y = canvas.height - 30;
export const STAR_NUMBER = 250;
export const SPEED = 40;
export const FIRE_KEY_FREQ = 200;
export const SHOOTING_SPEED = 15;
export const SPACESHIP = {
    COLOR: "#FF0000",
    SIZE: 20
};
export const ENEMY = {
    COLOR: "#00ff00",
    SIZE: 20,
    SHOT_COLOR: '#00ff00'
};
export const SHOT = {
    SIZE: 5,
    COLOR: '#FF0000'
}

export const SCORE = {
    FONT_COLOR: '#FFF',
    FONT_STYLE: 'bold 26px sans-serif'
}

export const ENEMY_SHOOTING_FREQ = 750;

export const SCORE_INCREASE = 10;