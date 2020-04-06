import React, { useState } from "react";
import ReactDOM from "react-dom";

import Button from "./Button";
import Anecdote from "./Anecdote";

const App = () => {
  const anecdotesInitialData = [
    { anecdote: "If it hurts, do it more often", votes: 0 },
    {
      anecdote: "Adding manpower to a late software project makes it later!",
      votes: 0
    },
    {
      anecdote:
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0
    },
    {
      anecdote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0
    },
    { anecdote: "Premature optimization is the root of all evil.", votes: 0 },
    {
      anecdote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0
    }
  ];

  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(anecdotesInitialData);

  const getRandomNumber = range => {
    return Math.floor(Math.random() * Math.floor(range));
  };

  const getMostVotedAnecdote = () => {
    let mostVoted = anecdotes[0];

    for (const anecdote of anecdotes) {
      if (anecdote.votes > mostVoted.votes) {
        mostVoted = anecdote;
      }
    }

    return mostVoted;
  };

  const onAnecdoteClick = () => {
    const selectedPhraseIndex = getRandomNumber(anecdotes.length);
    setSelected(selectedPhraseIndex);
  };

  const onVoteClick = () => {
    const voetedAnecdote = anecdotes[selected];
    const updatedAnecdotes = [...anecdotes];
    updatedAnecdotes[selected].votes = voetedAnecdote.votes + 1;
    setAnecdotes(updatedAnecdotes);
  };

  const { anecdote, votes } = anecdotes[selected];
  const mostVotedAnecdote = getMostVotedAnecdote();

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdote} votes={votes} />
      <Button text="vote" onClick={onVoteClick}></Button>
      <Button text="next anectode" onClick={onAnecdoteClick}></Button>
      <h1>Anecdote with most votes</h1>
      <Anecdote
        anecdote={mostVotedAnecdote.anecdote}
        votes={mostVotedAnecdote.votes}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
