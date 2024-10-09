import * as React from "react";
import { importPemPublicKey } from "../utils/crypto";
import { db } from "../utils/db";

export function KeyImporter() {
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const keyInputRef = React.useRef<HTMLTextAreaElement>(null);

  async function onClickButton() {
    if (!keyInputRef.current?.value || !nameInputRef.current?.value) {
      return;
    }

    const publicKey = await importPemPublicKey(keyInputRef.current.value);
    if (!publicKey) {
      return;
    }

    db.keys.add({
      name: nameInputRef.current.value,
      publicKey,
    });
  }

  return (
    <div>
      <div>
        <input ref={nameInputRef} placeholder="key name" />
      </div>
      <div>
        <textarea ref={keyInputRef} placeholder="public in pem" />
      </div>
      <button onClick={onClickButton}>import</button>
    </div>
  );
}
