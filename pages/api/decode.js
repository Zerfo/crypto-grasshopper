// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Buffer } from "buffer";
import { chunk } from "lodash";

import { decrypt } from "../../util/decrypt";

export default function handler(req, res) {
  const { body } = req || {};
  const { incodeStr, keyFile } = body || {};

  let key = Buffer(
    keyFile.replace("data:text/plain;base64,", ""),
    "base64"
  ).toString("utf8");

  const result = decrypt(incodeStr, key);

  res.status(200).json({ result });
}
