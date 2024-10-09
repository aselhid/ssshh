import { Decryptor } from "./components/Decryptor";
import { Encryptor } from "./components/Encryptor";
import { KeyGenerator } from "./components/KeyGenerator";
import { KeyImporter } from "./components/KeyImporter";
import { KeyList } from "./components/KeyList";

function App() {
  return (
    <div>
      <div style={{ border: "1px solid red" }}>
        <KeyGenerator />
      </div>
      <div style={{ border: "1px solid red" }}>
        <KeyImporter />
      </div>
      <div style={{ border: "1px solid red" }}>
        <KeyList />
      </div>
      <div style={{ border: "1px solid red" }}>
        <Encryptor />
      </div>
      <div style={{ border: "1px solid red" }}>
        <Decryptor />
      </div>
    </div>
  );
}

export default App;
