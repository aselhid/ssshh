import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";

export function KeyList() {
  const keys = useLiveQuery(() => db.keys.toArray());

  return (
    <div>
      <div>key list</div>
      <ul>{keys?.map((key) => <li key={key.name}>{key.name}</li>)}</ul>
    </div>
  );
}
