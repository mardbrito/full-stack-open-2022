import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_BOOKS, CREATE_BOOK } from "../queries";

const BookForm = ({ setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title,
        author,
        genres,
        published: Number(published),
      },
    });

    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres([]);
    setGenres("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <h2>create book</h2>
      <form onSubmit={submit}>
        <div>
          title{" "}
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author{" "}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published{" "}
          <input
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genre{" "}
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres}</div>

        <button type="submit">add!</button>
      </form>
    </div>
  );
};
export default BookForm;
