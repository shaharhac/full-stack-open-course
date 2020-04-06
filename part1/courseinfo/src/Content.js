import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const partsElementsList = parts.map(part => (
    <Part key={part.name} name={part.name} exercises={part.exercises} />
  ));
  return <div>{partsElementsList}</div>;
};

export default Content;
