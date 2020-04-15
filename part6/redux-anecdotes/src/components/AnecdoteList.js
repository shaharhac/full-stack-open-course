import React, { useEffect } from "react";
import { connect } from "react-redux";
import { vote, initAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

import AnecdoteItem from "./AnecdoteItem";
import Notification from "./Notification";

const AnecdoteList = props => {
  useEffect(() => {
    props.initAnecdotes();
  }, [props]);

  const handleVote = anecdote => {
    props.vote(anecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 5);
  };

  return (
    <div>
      {props.notification.text ? <Notification /> : null}
      {props.anecdotes
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
        .map(anecdote => (
          <AnecdoteItem
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={handleVote}
          />
        ))}
    </div>
  );
};

const mapDispatchToProps = {
  initAnecdotes,
  setNotification,
  vote
};

const mapStateToProps = state => {
  const props = { notification: state.notification };
  if (state.filter) {
    props.anecdotes = state.anecdotes.filter(anecdote =>
      anecdote.content.includes(state.filter)
    );
  } else {
    props.anecdotes = state.anecdotes;
  }

  return props;
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default connectedComponent;
