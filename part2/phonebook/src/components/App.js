import React, { useState, useEffect } from "react";
import axios from "axios";

import personService from "../services/personService";

import PersonsList from "./PersonsList";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons));
  }, []);

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const showNotification = notification => {
    setNotification({ enabled: true, ...notification });
    setTimeout(() => setNotification({ enabled: false }), 2000);
  };

  const handlePersonDelete = (id, name) => {
    const result = window.confirm(`are you sure you want to delete ${name}?`);

    if (result) {
      personService
        .deleteOne(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          showNotification({
            type: "error",
            message: `information of ${name} has already been removed from server`
          });
        });
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const duplicatePerson = persons.find(person => person.name === newName);
    if (duplicatePerson) {
      const replaceNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (replaceNumber) {
        const updatedPerson = { ...duplicatePerson, number: newNumber };
        personService
          .update(duplicatePerson.id, updatedPerson)
          .then(response => {
            setPersons(
              persons.map(person =>
                person.id !== duplicatePerson.id ? person : updatedPerson
              )
            );

            showNotification({
              type: "success",
              message: `updated ${newName} number to ${newNumber}`
            });

            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            showNotification({
              type: "error",
              message: `information of ${newName} has already been removed from server`
            });
          });

        return;
      }
    }

    const person = {
      name: newName,
      number: newNumber
    };

    personService.create(person).then(person => {
      setPersons(persons.concat(person));

      showNotification({
        type: "success",
        message: `added ${newName} to phonebook`
      });
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.enabled ? (
        <Notification message={notification.message} type={notification.type} />
      ) : null}
      <label>filter shown with</label>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={handleFormSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <PersonsList persons={personsToShow} onDelete={handlePersonDelete} />
    </div>
  );
};

export default App;
