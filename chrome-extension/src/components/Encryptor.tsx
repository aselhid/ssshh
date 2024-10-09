import * as React from "react";

import { useLiveQuery } from "dexie-react-hooks";
import { utf8btoa } from "../utils/encoding";
import { db, type Key } from "../utils/db";
import { rsaEncryptUtf8 } from "../utils/crypto";

export function Encryptor() {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const keys = useLiveQuery(() =>
    db.keys.filter((key) => !!key.publicKey).toArray(),
  );

  async function onClickButton(key: Key) {
    if (!textAreaRef.current?.value) {
      return;
    }

    textAreaRef.current.value = utf8btoa(
      await rsaEncryptUtf8(key.publicKey!, textAreaRef.current.value),
    );
  }

  return (
    <div>
      {keys &&
        keys.map((key) => (
          <div>
            <button onClick={() => onClickButton(key)}>{key.name}</button>
          </div>
        ))}

      <textarea ref={textAreaRef} />
    </div>
  );
}
