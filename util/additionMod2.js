import { BLOCK_SIZE } from "../constants";

// Сложение 2х двоичных векторов по модулю 2
export function additionMod2(a, b) {
  const c = [];

  for (let i = 0; i < BLOCK_SIZE; i++) c.push(a[i] ^ b[i]);

  return c;
}
