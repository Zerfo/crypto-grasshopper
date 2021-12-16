import { range } from "lodash";
import { methodR, reverseMethodR } from "./methodR";

// Сдвиг регистра 16 раз
export function methodL(inData) {
  let outData = range(inData.length);
  let internal = inData;

  for (let i = 0; i < 16; i++) {
    internal = methodR(internal);
  }

  outData = internal;
  return outData;
}

export function reverseMethodL(inData) {
  let outData = range(inData.length);
  let internal = inData;

  for (let i = 0; i < 16; i++) internal = reverseMethodR(internal);

  outData = internal;

  return outData;
}
