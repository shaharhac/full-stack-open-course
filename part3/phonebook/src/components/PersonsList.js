import React from "react";

import Person from "./Person";

const PersonsList = ({ persons, onDelete }) => {
  const personsList = persons.map(person => (
    <Person key={person.id} person={person} onDelete={onDelete}></Person>
  ));

  return <div>{personsList}</div>;
};

export default PersonsList;
