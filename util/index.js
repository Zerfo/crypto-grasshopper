import { chunk } from "lodash";

export function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

export function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return hex.join("");
}

export function reverse(string) {
  return chunk(string, string.length / 2)
    .map((l) => l.reverse())
    .reverse()
    .flat();
}

export function stringToHex(string) {
  return Array.from(Buffer.from(string, "utf8").toString("hex"));
}

export function hexToString(hex) {
  return Buffer.from(hex).toString("utf8");
}
