const Filter = ({ search, fnSearch }) => {
  return (
    <div>
      find countries{" "}
      <input
        type="text"
        value={search}
        onChange={(event) => fnSearch(event.target.value)}
      />
    </div>
  );
};

export default Filter;
