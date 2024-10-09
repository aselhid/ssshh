import * as React from "react";

import { db } from "../utils/db";

import { rsaGenerateKeyPair, exportPublicKeyToPem } from "../utils/crypto";

export function KeyGenerator() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [publicKeyDisplay, setPublicKeyDisplay] = React.useState("");

  async function onGenerate() {
    // note that the private key is still extractable
    const keyPair = await rsaGenerateKeyPair();
    try {
      await db.keys.add({
        name: inputRef.current?.value,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
      });
      setPublicKeyDisplay(await exportPublicKeyToPem(keyPair.publicKey));
    } catch {
      alert("key name exist");
    }
  }

  return (
    <div>
      <input placeholder="key name" ref={inputRef} />
      <button onClick={onGenerate}>generate key</button>
      {publicKeyDisplay && (
        <pre
          style={{
            width: "500px",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {publicKeyDisplay}
        </pre>
      )}
    </div>
  );
}
