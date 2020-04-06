import React, { useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const sentiments = [
    {
      name: "good",
      value: good,
      setter: setGood
    },
    {
      name: "neutral",
      value: neutral,
      setter: setNeutral
    },
    { name: "bad", value: bad, setter: setBad }
  ];

  const makeHandler = (value, setter) => {
    return () => {
      setter(value + 1);
    };
  };

  const buttonList = sentiments.map(({ name, value, setter }) => (
    <Button key={name} text={name} onClick={makeHandler(value, setter)} />
  ));

  return (
    <div>
      <Header text="give feedback" />
      {buttonList}
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
