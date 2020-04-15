import anecdoteService from "../services/anecdotesService";

const reducer = (state = [], action) => {
  const newState = [...state];

  switch (action.type) {
    case "VOTE":
      const id = action.payload.id;
      const anecdote = newState.find(anecdote => anecdote.id === id);
      anecdote.votes++;
      return newState;
    case "CREATE_ANECDOTE":
      return newState.concat(action.payload);
    case "INIT_NOTES":
      return action.payload.notes;
    default:
      return state;
  }
};

export const vote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id);

    dispatch({
      type: "VOTE",
      payload: {
        ...updatedAnecdote
      }
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content);

    dispatch({
      type: "CREATE_ANECDOTE",
      payload: {
        ...newAnecdote
      }
    });
  };
};

export const initAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll();

    dispatch({
      type: "INIT_NOTES",
      payload: {
        notes
      }
    });
  };
};

export default reducer;
