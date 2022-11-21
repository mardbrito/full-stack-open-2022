import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_AUTHORS, EDIT_BIRTH } from "../queries";

const BornForm = ({ setError, authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeAuthor, result] = useMutation(EDIT_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    changeAuthor({ variables: { name, born: Number(born) } });

    setName("");
    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("Author not found");
    }
  }, [result.data]); // eslint-disable-line

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          auhtor name{" "}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          birthyear{" "}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">change born year</button>
      </form>
    </div>
  );
};
export default BornForm;
