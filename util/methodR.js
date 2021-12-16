import { range } from "lodash";
import { lVec } from "../constants";
import { multiplyingInFiniteField } from "./multiplyingInFiniteField";

// Функция сдвига регистра
export function methodR(state) {
  let a15 = 0;
  let internal = range(16);

  for (let i = 15; i >= 0; i--) {
    // Сдвиг байт в сторону младшего разряда
    if (i == 0) internal[15] = state[i];
    // в сторону старшего
    else internal[i - 1] = state[i];

    a15 = a15 ^ multiplyingInFiniteField(state[i], lVec[i]);
  }

  // Пишем в полсдений байт результат сложения
  internal[15] = a15;
  return internal;
}

export function reverseMethodR(state) {
  let a0 = state[15];
  let internal = range(16);

  for (let i = 1; i < 16; i++) {
    internal[i] = state[i - 1];
    a0 = a0 ^ multiplyingInFiniteField(internal[i], lVec[i]);
  }
  internal[0] = a0;
  return internal;
}
