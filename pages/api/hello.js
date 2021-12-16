// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  bytesToHex,
  GOST_Kuz_Decrypt,
  GOST_Kuz_Encrypt,
  GOST_Kuz_Expand_Key,
  hexToBytes,
} from "../../util";

const key1 = [
  0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00, 0xff, 0xee, 0xdd, 0xcc, 0xbb,
  0xaa, 0x99, 0x88,
];
const key2 = [
  0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01, 0x10, 0x32, 0x54, 0x76, 0x98,
  0xba, 0xdc, 0xfe,
];

export default function handler(req, res) {
  const string = "8899aabbccddeeff0011223344556677";
  const blk = hexToBytes(string);
  GOST_Kuz_Expand_Key(key1, key2);
  console.log(string, "\n");
  const encryptBlok = GOST_Kuz_Encrypt(blk);
  console.log(bytesToHex(encryptBlok), "\n");
  const decryptBlok = GOST_Kuz_Decrypt(encryptBlok);
  console.log(bytesToHex(decryptBlok));

  res.status(200).json({ name: "John Doe" });
}
