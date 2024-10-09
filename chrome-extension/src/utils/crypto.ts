import {
  arrayBufferToString,
  stringToArrayBuffer,
  utf8BufferToString,
  stringToUtf8Buffer,
} from "./encoding";

export function rsaGenerateKeyPair() {
  return window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    false,
    ["encrypt", "decrypt"],
  );
}

// plain text -> plain utf 8 buffer -> encrypted buffer -> binary string
export async function rsaEncryptUtf8(publicKey: CryptoKey, plainText: string) {
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    stringToUtf8Buffer(plainText),
  );
  return arrayBufferToString(encryptedBuffer);
}

//  binary string -> decrypted buffer -> plain utf 8 buffer -> plain text
export async function rsaDecryptUtf8(
  privateKey: CryptoKey,
  cipherText: string,
) {
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    stringToArrayBuffer(cipherText),
  );
  return utf8BufferToString(decryptedBuffer);
}

const PEM_PUBLIC_HEADER = "-----BEGIN PUBLIC KEY-----";
const PEM_PUBLIC_FOOTER = "-----END PUBLIC KEY-----";

function formatPublicPem(key: string) {
  return `${PEM_PUBLIC_HEADER}\n${key}\n${PEM_PUBLIC_FOOTER}`;
}

export async function exportPublicKeyToPem(key: CryptoKey) {
  const buffer = await window.crypto.subtle.exportKey("spki", key);
  return formatPublicPem(window.btoa(arrayBufferToString(buffer)));
}

export async function importPemPublicKey(key: string) {
  const pemContent = key.substring(
    PEM_PUBLIC_HEADER.length,
    key.length - PEM_PUBLIC_FOOTER.length - 1,
  );

  return window.crypto.subtle.importKey(
    "spki",
    stringToArrayBuffer(window.atob(pemContent)),
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["encrypt"],
  );
}
