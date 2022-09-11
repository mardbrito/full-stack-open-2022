const Persons = ({ filteredPersons, delelePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => delelePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
