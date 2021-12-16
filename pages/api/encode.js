// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { encrypt } from "../../util/encrypt";
import { Buffer } from "buffer";
import { chunk } from "lodash";
import { bytesToHex } from "../../util";

function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export default function handler(req, res) {
  const { body } = req || {};
  const { incodeStr, keyFile } = body || {};

  let buff = Buffer(
    keyFile.replace("data:text/plain;base64,", ""),
    "base64"
  ).toString("utf8");

  const key = chunk(buff.split(","), 16);

  const result = encrypt(incodeStr, key);

  res.status(200).json({ result: bytesToHex(result) });
}
