import React from "react";

const Person = ({ person, onDelete }) => {
  const { id, name, number } = person;
  return (
    <div>
      {name} {number} <button onClick={() => onDelete(id, name)}>delete</button>
    </div>
  );
};

export default Person;
