import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { USER, ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const meResult = useQuery(USER);
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "no-cache",
  });
  const [me, setMe] = useState(null);
  const [myBooks, setMeBooks] = useState([]);

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      setMe(meResult.data.me);
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } });
    }
  }, [meResult, me, getBooks]);

  useEffect(() => {
    if (result.data) setMeBooks(result.data.allBooks);
  }, [result]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      {myBooks.length > 0 ? (
        <div>
          <p>
            books in your favorite genre patterns:{" "}
            <strong>{me && me.favoriteGenre}</strong>
          </p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {myBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>
          No books have been added yet based on your favorite genre{" "}
          <strong>{me.favoriteGenre}</strong>
        </p>
      )}
    </div>
  );
};

export default Recommend;
