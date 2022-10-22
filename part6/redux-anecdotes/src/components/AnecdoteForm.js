import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { notification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = async (event) => {
    event.preventDefault();

    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(addAnecdote(anecdote));
    dispatch(notification(`new anecdote ${anecdote}`, 5));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
