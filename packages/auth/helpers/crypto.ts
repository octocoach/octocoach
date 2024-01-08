const getKeys = async () => {
  const keyIv = process.env.CIPHER_KEY;
  if (!keyIv) {
    throw new Error("CIPHER_KEY not found");
  }

  const [keyString, ivString] = keyIv.split(":");
  const keyBuffer = new TextEncoder().encode(keyString);
  const ivBuffer = new TextEncoder().encode(ivString);

  const key = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  return { key, iv: ivBuffer };
};

export async function encrypt(text: string) {
  const { key, iv } = await getKeys();
  const textBuffer = new TextEncoder().encode(text);
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    textBuffer
  );

  return bufferToHex(encryptedBuffer);
}

export async function decrypt(hexString: string) {
  const { key, iv } = await getKeys();
  const encryptedBuffer = hexToBuffer(hexString);
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    encryptedBuffer
  );

  return new TextDecoder().decode(decryptedBuffer);
}

// Helper functions for hex conversion
function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBuffer(hexString: string) {
  const bytes = new Uint8Array(Math.ceil(hexString.length / 2));
  for (let i = 0, j = 0; i < hexString.length; i += 2, j++) {
    bytes[j] = parseInt(hexString.substring(i, i + 2), 16);
  }
  return bytes.buffer;
}
