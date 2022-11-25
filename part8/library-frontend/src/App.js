import { useEffect, useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import Notification from "./components/Notification";

import { ALL_BOOKS, BOOK_ADDED } from "./queries";

function App() {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const userFromStorage = localStorage.getItem("library-user-token");
    if (userFromStorage) {
      setToken(userFromStorage);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      setErrorMessage(`${addedBook.title} added`);

      updateCacheWith(addedBook);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <div>
      {token ? (
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommend")}>recommend</button>
          <button onClick={logout}>logout</button>
          <BookForm show={page === "add"} />
          <Recommend show={page === "recommend"} />
        </div>
      ) : (
        // <button onClick={() => setPage("login")}>login</button>
        <LoginForm
          show={page === "login"}
          setToken={setToken}
          setError={notify}
          setPage={setPage}
        />
      )}
      <Notification message={errorMessage} />
      <Authors show={page === "authors"} setError={setErrorMessage} />
      <Books show={page === "books"} />
    </div>
  );
}

export default App;
