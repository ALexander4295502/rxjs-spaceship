import { BehaviorSubject } from "rxjs";
import { ctx } from "./canvas";
import { SCORE } from "../Constants";

function paintScore(score) {
  ctx.fillStyle = SCORE.FONT_COLOR;
  ctx.font = SCORE.FONT_STYLE;
  ctx.fillText(`Score: ${score}`, 40, 43);
}

const ScoreSubject$ = new BehaviorSubject(0);
const Score$ = ScoreSubject$.scan((prev, cur) => prev + cur, 0);

export { Score$, ScoreSubject$, paintScore };
