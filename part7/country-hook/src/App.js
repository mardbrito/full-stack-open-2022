import { useState } from "react";

import Country from "./components/Country";
import { useCountry, useField } from "./hooks";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (event) => {
    event.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      {country === null ? "Not Found..." : <Country country={country} />}
    </div>
  );
};

export default App;
