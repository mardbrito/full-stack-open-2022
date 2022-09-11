const PersonForm = ({
  onSubmit,
  onChangeName,
  onChangeNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input type="text" value={newName} onChange={onChangeName} />
      </div>
      <div>
        number:
        <input type="text" value={newNumber} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
