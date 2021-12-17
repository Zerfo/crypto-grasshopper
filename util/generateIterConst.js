import { range } from "lodash";
import { BLOCK_SIZE } from "../constants";
import { methodL } from "./methodL";

const N = 32;

// функция расчета констант
export function generateIterConst() {
  const iterC = new Array(32);

  const iterNum = range(32).map(() => range(BLOCK_SIZE));

  for (let i = 0; i < 32; i++) {
    for (let j = 0; j < BLOCK_SIZE; j++) iterNum[i][j] = 0;

    iterNum[i][0] = i + 1;
  }

  for (let i = 0; i < 32; i++) {
    iterC[i] = methodL(iterNum[i]);
  }

  return iterC;
}
