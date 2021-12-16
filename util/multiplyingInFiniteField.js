// функция умножения чисел в конечном поле (или поле Галуа) над неприводимым полиномом x^8 + x^7 + x^6 + x + 1.
export function multiplyingInFiniteField(a, b) {
  let c = 0;
  let hiBit;

  for (let i = 0; i < 8; i++) {
    if ((b & 1) == 1) c = a ^ c;
    hiBit = a & 0x80;
    a = a << 1;
    if (hiBit < 0) a = a ^ 0xc3; // Полином x^8 + x^7 + x^6 + x + 1
    b = b >> 1;
  }
  return c;
}
