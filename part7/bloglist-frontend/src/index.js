import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import { Container } from "semantic-ui-react";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Container>
        <App />
      </Container>
    </Router>
  </Provider>,
  document.getElementById("root")
);
