import { createCipheriv, createDecipheriv } from "crypto";

function getKeys() {
  const keyIv = process.env.CIPHER_KEY;

  if (!keyIv) {
    throw new Error("CIPHER_KEY not found");
  }

  const [key, iv] = keyIv.split(":");

  if (!key || !iv) throw new Error("Malformed Key!");

  return { key, iv };
}

export function encrypt(text: string) {
  const { key, iv } = getKeys();
  const encrypter = createCipheriv("aes-256-cbc", key, iv);
  let encrypted = encrypter.update(text, "utf8", "hex");
  encrypted += encrypter.final("hex");
  return encrypted;
}

export function decrypt(text: string) {
  const { key, iv } = getKeys();
  const decrypter = createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decrypter.update(text, "hex", "utf8");
  decrypted += decrypter.final("utf8");
  return decrypted;
}
