const Filter = ({ search, setSearch }) => {
  return (
    <div>
      filter shown with:
      <input type="text" value={search} onChange={setSearch} />
    </div>
  );
};

export default Filter;
