// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { encrypt } from '../../util/encrypt';

export default function handler(req, res) {
  const { body } = req || {};
  const { incodeStr, keyFile } = body || {};
  
  res.status(200);
}