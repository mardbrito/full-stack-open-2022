import { useEffect, useState } from "react";
import axios from "axios";

import Countrie from "./components/Countrie";
import Filter from "./components/Filter";
import CountrieList from "./components/CountrieList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((countrie) =>
    countrie.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const selectCountrie = (countrie) => {
    setSearch(countrie);
  };

  return (
    <div>
      <Filter search={search} fnSearch={setSearch} />
      <div>
        {search === ""
          ? "Specify a filter"
          : filteredCountries.length > 10
          ? "To many matches, specify another filter"
          : filteredCountries.length === 1
          ? filteredCountries.map((countrie, index) => {
              return <Countrie countrie={countrie} key={index} />;
            })
          : filteredCountries.map((countrie, index) => (
              <CountrieList
                key={index}
                countrieName={countrie.name.common}
                selectCountrie={selectCountrie}
              />
            ))}
      </div>
    </div>
  );
};

export default App;
