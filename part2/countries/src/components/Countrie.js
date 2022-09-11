import Weather from "./Weather";

const Countrie = ({ countrie }) => {
  return (
    <div>
      <h1>{countrie.name.common}</h1>
      <p>capital {countrie.capital}</p>
      <p>area {countrie.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(countrie.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={countrie.flags.png} alt={countrie.name.common} />
      <Weather capital={countrie.capital} />
    </div>
  );
};
export default Countrie;
