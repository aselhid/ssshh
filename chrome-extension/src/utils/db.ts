import Dexie, { EntityTable } from "dexie";

export type Key = {
  name: string;
  publicKey?: CryptoKey;
  privateKey?: CryptoKey;
};

const db = new Dexie("KeyDatabase") as Dexie & {
  keys: EntityTable<Key, "name">;
};

db.version(1).stores({
  keys: "&name, publicKey, privateKey",
});

export { db };
