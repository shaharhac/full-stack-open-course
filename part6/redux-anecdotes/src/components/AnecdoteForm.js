import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = props => {
  const handleCreate = async event => {
    event.preventDefault();
    const anecdoteText = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";

    props.createAnecdote(anecdoteText);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote
};

const connectedComponent = connect(undefined, mapDispatchToProps)(AnecdoteForm);
export default connectedComponent;
