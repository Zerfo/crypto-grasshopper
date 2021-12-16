import { BLOCK_SIZE, Pi, reversePi } from "../constants";

// S-преобразование
export function sConversion(inData) {
  const outData = [];

  for (let i = 0; i < BLOCK_SIZE; i++) {
    let data = inData[i];
    if (data < 0) data = data + 256;

    outData[i] = Pi[data];
  }

  return outData;
}

// Обратное преобразование(используется для расшифровки)
export function reverseSConversion(inData) {
  let outData = _.range(inData.length);

  for (let i = 0; i < BLOCK_SIZE; i++) {
    let data = inData[i];
    if (data < 0) {
      data = data + 256;
    }
    outData[i] = reversePi[data];
  }
  return outData;
}
