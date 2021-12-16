import { Buffer } from "buffer";
import crypto from "crypto";

import { generateExpandKey } from "../../util/generateExpandKey";
import {hexToBytes} from '../../util'

export default function handler(req, res) {
  const firstKey = hexToBytes(crypto.randomBytes(16).toString('hex'));
  const secondKey = hexToBytes(crypto.randomBytes(16).toString('hex'));

  const key = generateExpandKey(firstKey, secondKey).flat().join(",");

  const buf = Buffer.from(key, "utf8").toString("base64");

  res.status(200).json({ key: `data:text/plain;base64,${buf}` });
}
