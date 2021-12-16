import { reverseMethodL } from "./methodL";
import { reverseSConversion } from "./sConversion";

export function decrypt(blk, iterKey) {
  let outBlk = additionMod2(blk, iterKey[9]);

  for (let i = 8; i >= 0; i--) {
    outBlk = reverseMethodL(outBlk);
    outBlk = reverseSConversion(outBlk);
    outBlk = additionMod2(iterKey[i], outBlk);
  }

  return outBlk;
}
