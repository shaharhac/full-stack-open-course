import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../queries";

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if (result && result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result, setToken]);

  const onLogin = event => {
    event.preventDefault();
    login({ variables: { username, password } });

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={onLogin}>
        <div>
          <label>username</label>
          <input onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
