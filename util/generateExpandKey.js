import { range } from "lodash";
import { generateIterConst } from "./generateIterConst";
import { methodF } from "./methodF";

// Развертывание(генерация) ключей
export function generateExpandKey(key1, key2) {
  // Предыдущая пара ключей
  let iter12 = range(2);
  // Текущая пара ключей
  let iter34 = range(2);

  // Вычисляем итерационные константы
  const iterC = generateIterConst();

  const iterKey = new Array(10);

  // Первые 2 итерационных ключа равны паре мастер-ключа
  iterKey[0] = key1;
  iterKey[1] = key2;

  iter12[0] = key1;
  iter12[1] = key2;

  for (let i = 0; i < 4; i++) {
    iter34 = methodF(iter12[0], iter12[1], iterC[0 + 8 * i]);
    iter12 = methodF(iter34[0], iter34[1], iterC[1 + 8 * i]);
    iter34 = methodF(iter12[0], iter12[1], iterC[2 + 8 * i]);
    iter12 = methodF(iter34[0], iter34[1], iterC[3 + 8 * i]);
    iter34 = methodF(iter12[0], iter12[1], iterC[4 + 8 * i]);
    iter12 = methodF(iter34[0], iter34[1], iterC[5 + 8 * i]);
    iter34 = methodF(iter12[0], iter12[1], iterC[6 + 8 * i]);
    iter12 = methodF(iter34[0], iter34[1], iterC[7 + 8 * i]);

    iterKey[2 * i + 2] = iter12[0];
    iterKey[2 * i + 3] = iter12[1];
  }
  return iterKey;
}
