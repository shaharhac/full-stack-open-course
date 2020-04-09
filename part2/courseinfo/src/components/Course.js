import React from "react";

import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

const Course = ({ course }) => {
  const { name, parts } = course;
  const sumOfExercises = parts.reduce(
    (prev, current) => prev + current.exercises,
    0
  );

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total exercises={sumOfExercises} />
    </div>
  );
};

export default Course;
