import React from "react";
import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  console.log(id);
  const anecdote = anecdotes.find((n) => Number(n.id) === Number(id));

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>{" "}
      </p>
    </div>
  );
};

export default Anecdote;
