// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Buffer } from "buffer";
import { chunk } from "lodash";

import { decrypt } from "../../util/decrypt";
import { bytesToHex, hexToBytes, hexToString } from "../../util";

export default function handler(req, res) {
  const { body } = req || {};
  const { inputFile, keyFile } = body || {};

  const data = inputFile.split(",");

  let inputFileData = Buffer(data[1], "base64").toString("utf8");

  const blocks = chunk(inputFileData.split(","), 16);

  let buff = Buffer(
    keyFile.replace("data:text/plain;base64,", ""),
    "base64"
  ).toString("utf8");

  const keysArray = chunk(chunk(buff.split(","), 16), 10);

  const result = [];

  blocks.forEach((block, index) => {
    result.push(
      Buffer.from(decrypt(block, keysArray[index])).reverse().toString("utf8")
    );
  });

  const outputFile = Buffer.from(result.join(""), "utf8").toString("base64");

  res.status(200).json({ outputFile });
}
