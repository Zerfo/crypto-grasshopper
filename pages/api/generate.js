import { Buffer } from "buffer";
import { bytesToHex } from "../../util";

import { generateExpandKey } from "../../util/generateExpandKey";

const key1 = [
  0x75, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00, 0xff, 0xee, 0xdd, 0xcc, 0xbb,
  0xaa, 0x99, 0x88,
];
const key2 = [
  0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01, 0x10, 0x32, 0x54, 0x76, 0x98,
  0xba, 0xdc, 0xfe,
];

export default function handler(req, res) {
  const key = generateExpandKey(key1, key2).flat().join(",");
  const buf = Buffer.from(key, "utf8").toString("base64");

  console.log(bytesToHex(key1), bytesToHex(key2));

  res.status(200).json({ key: `data:text/plain;base64,${buf}` });
}
