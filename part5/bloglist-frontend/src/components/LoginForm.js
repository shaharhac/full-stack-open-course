import React, { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form onSubmit={event => handleLogin(event, username, password)}>
        <label>username </label>
        <input
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label>password </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
