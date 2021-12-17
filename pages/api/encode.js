// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { encrypt } from "../../util/encrypt";
import { Buffer } from "buffer";
import { chunk } from "lodash";

export default function handler(req, res) {
  const { body } = req || {};
  const { incodeStr, keyFile } = body || {};

  let key = Buffer(
    keyFile.replace("data:text/plain;base64,", ""),
    "base64"
  ).toString("utf8");

  const result = encrypt(incodeStr, key);

  res.status(200).json({ result });
}
