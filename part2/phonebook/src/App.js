import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    retrievePersons();
  }, []);

  const retrievePersons = () => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
        setFilteredPersons(initialPersons);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const result = persons.find(({ name }) => name === newName);

    if (result) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personForm = {
          number: newNumber,
          name: newName,
        };

        personService.update(result.id, personForm).then(() => {
          setMessage(`The number of '${newName}' was changed!`);
          setSuccess("success");
          setTimeout(() => {
            setMessage(null);
            setSuccess(null);
          }, 5000);
          retrievePersons();
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      const personForm = {
        name: newName,
        number: newNumber,
      };

      personService.create(personForm).then(() => {
        setMessage(`Added '${newName}'`);
        setSuccess("success");
        setTimeout(() => {
          setMessage(null);
          setSuccess(null);
        }, 5000);
        retrievePersons();
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const filterPersonName = (event) => {
    const search = event.target.value;
    setSearch(search);
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delele ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setMessage(`'${name}' has been removed from server`);
          setSuccess("success");
          setTimeout(() => {
            setMessage(null);
            setSuccess(null);
          }, 5000);
          retrievePersons();
        })
        .catch(() => {
          setMessage(
            `Informatios of '${name}' has already been removed from server`
          );
          setSuccess("error");
          setTimeout(() => {
            setMessage(null);
            setSuccess(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={success} />

      <Filter search={search} setSearch={filterPersonName} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onChangeName={handleNewName}
        onChangeNumber={handleNewNumber}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} delelePerson={deletePerson} />
    </div>
  );
};

export default App;
