import React from "react";

const Anecdote = ({ anecdote, votes }) => (
  <div>
    {anecdote}
    <div>has {votes} votes</div>
  </div>
);

export default Anecdote;
