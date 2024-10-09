import * as React from "react";

import { useLiveQuery } from "dexie-react-hooks";
import { db, type Key } from "../utils/db";
import { rsaDecryptUtf8 } from "../utils/crypto";
import { utf8atob } from "../utils/encoding";

export function Decryptor() {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const keys = useLiveQuery(() =>
    db.keys.filter((key) => !!key.privateKey).toArray(),
  );

  async function onClickButton(key: Key) {
    if (!textAreaRef.current?.value) {
      return;
    }

    textAreaRef.current.value = await rsaDecryptUtf8(
      key.privateKey!,
      utf8atob(textAreaRef.current.value),
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
