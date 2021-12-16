import _ from "lodash";

// export function GOST_Kuz_Encrypt(blk) {
//   let outBlk = blk;

//   for (let i = 0; i < 9; i++) {
//     outBlk = GOST_Kuz_X(iterKey[i], outBlk);
//     outBlk = GOST_Kuz_S(outBlk);
//     outBlk = methodL(outBlk);
//   }
//   outBlk = GOST_Kuz_X(outBlk, iterKey[9]);

//   return outBlk;
// }

// export function GOST_Kuz_Decrypt(blk) {
//   let outBlk = GOST_Kuz_X(blk, iterKey[9]);

//   for (let i = 8; i >= 0; i--) {
//     outBlk = GOST_Kuz_reverse_L(outBlk);
//     outBlk = GOST_Kuz_reverse_S(outBlk);
//     outBlk = GOST_Kuz_X(iterKey[i], outBlk);
//   }

//   return outBlk;
// }

export function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

export function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return _.chunk(hex, 16)
    .map((l) => l.reverse())
    .reverse()
    .flat()
    .join("");
}
