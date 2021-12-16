import { additionMod2 } from "./additionMod2";
import { methodL } from "./methodL";
import { sConversion } from "./sConversion";

export function encrypt(blk, iterKey) {
  let outBlk = blk;

  for (let i = 0; i < 9; i++) {
    outBlk = additionMod2(iterKey[i], outBlk);
    outBlk = sConversion(outBlk);
    outBlk = methodL(outBlk);
  }
  outBlk = additionMod2(outBlk, iterKey[9]);

  return outBlk;
}
