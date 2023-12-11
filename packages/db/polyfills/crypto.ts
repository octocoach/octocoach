import crypto from "crypto"; // should have webcrypto.getRandomValues defined

if (typeof global.crypto !== "object") {
  global.crypto = crypto;
}

if (typeof global.crypto.getRandomValues !== "function") {
  global.crypto.getRandomValues = getRandomValues;
}

function getRandomValues(array: Uint8Array) {
  return crypto.webcrypto.getRandomValues(array);
}
