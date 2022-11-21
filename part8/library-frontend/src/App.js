import { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={() => setPage("authors")}>authors</button>
      <button onClick={() => setPage("books")}>books</button>
      <button onClick={() => setPage("add")}>add book</button>
      {page === "authors" ? (
        <Authors />
      ) : page === "books" ? (
        <Books />
      ) : (
        <BookForm setError={notify} />
      )}
    </div>
  );
}

export default App;
