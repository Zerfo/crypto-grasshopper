// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { encrypt } from "../../util/encrypt";
import { Buffer } from "buffer";
import { chunk, range } from "lodash";
import {
  bytesToHex,
  convertToHex,
  hexToBytes,
  hexToString,
  reverse,
  stringToHex,
} from "../../util";
import randombytes from "randombytes";
import { generateExpandKey } from "../../util/generateExpandKey";

const testKey = [
  0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00, 0xff, 0xee, 0xdd, 0xcc, 0xbb,
  0xaa, 0x99, 0x88,
];

export default function handler(req, res) {
  const { body } = req || {};
  const { inputFile, fileName } = body || {};

  const buffer = Buffer(inputFile.split("base64,").slice(1).join(""), "base64");

  let blocks = chunk(buffer, 16);

  blocks = blocks.map((block, i) => {
    if (i === blocks.length - 1) {
      const ost = block.length % 16;
      const zeros = ost ? 16 - ost : 0;

      return [...block, ...range(zeros).map(() => 0)];
    }
    return block;
  });

  const key = [];

  const key2 = Array.from(randombytes(16));

  blocks.forEach((block) => {
    const key1 = reverse(block);

    const blockKey = generateExpandKey(key1, key2);

    key.push(blockKey);
  });

  const result = blocks.map((block, index) => encrypt(block, key[index]));

  const keyFile = Buffer.from(key.flat(Infinity).join(","), "utf8").toString(
    "base64"
  );

  const outputFile = Buffer.from(
    result.flat(Infinity).join(","),
    "utf8"
  ).toString("base64");

  res.status(200).json({
    keyFile,
    outputFile,
  });
}
