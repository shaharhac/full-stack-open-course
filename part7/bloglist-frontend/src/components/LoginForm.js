import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form
      size="small"
      widths="equal"
      onSubmit={event => handleLogin(event, username, password)}
    >
      <Form.Field>
        <label>Username</label>
        <Input
          width="200px"
          placeholder="Username"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default LoginForm;
