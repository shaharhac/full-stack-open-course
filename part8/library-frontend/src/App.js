import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    setToken(token);
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      alert(`${book.title} by ${book.author.name} added!`);
    }
  });

  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    history.push("/");
  };

  return (
    <div>
      <div>
        <Link to="/authors">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        {token ? (
          <span>
            <Link to="/books/add">
              <button>add book</button>
            </Link>
            <Link to="/recommendations">
              <button>recommendations</button>
            </Link>
            <button onClick={logoutHandler}>logout</button>
          </span>
        ) : (
          <Link to="/login">
            <button>login </button>
          </Link>
        )}
      </div>
      {error ? <div>{error}</div> : null}
      <Switch>
        <Route path="/authors">
          <Authors />
        </Route>
        {token ? (
          <Route path="/books/add">
            <NewBook />
          </Route>
        ) : (
          <Route path="/login">
            <LoginForm setError={setError} setToken={setToken} />
          </Route>
        )}
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/recommendations">
          <Recommendations />
        </Route>
        <Route path="/">
          <Redirect to="/books" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
