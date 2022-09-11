const CountrieList = ({ countrieName, selectCountrie }) => {
  return (
    <div>
      {countrieName}{" "}
      <button onClick={() => selectCountrie(countrieName)}>show</button>
    </div>
  );
};

export default CountrieList;
