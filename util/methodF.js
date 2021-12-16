import { range } from "lodash";
import { additionMod2 } from "./additionMod2";
import { methodL } from "./methodL";
import { sConversion } from "./sConversion";

// Одна итерация развертывания ключа (раундового), функция, выполняющая преобразования ячейки Фейстеля
export function methodF(inKey1, inKey2, iterConst) {
  let internal;
  let outKey2 = inKey1;

  internal = additionMod2(inKey1, iterConst);
  internal = sConversion(internal);
  internal = methodL(internal);

  const outKey1 = additionMod2(internal, inKey2);

  let key = range(2);

  key[0] = outKey1;
  key[1] = outKey2;

  return key;
}
