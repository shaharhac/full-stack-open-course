import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "part1", exercises: 10 },
      { name: "part2", exercises: 7 },
      { name: "part3", exercises: 14 }
    ],
    sumOfExercises: function() {
      return this.parts.reduce((prev, current) => prev + current.exercises, 0);
    }
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.sumOfExercises()} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
