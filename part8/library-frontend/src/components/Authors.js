import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const authors = (result && result.data && result.data.allAuthors) || [];

  const setBirthyear = e => {
    e.preventDefault();
    updateAuthor({ variables: { name, setBornTo: Number(born) } });

    setName("");
    setBorn("");
  };

  const selectName = ({ target }) => {
    setName(target.value);
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={setBirthyear}>
        <label>name</label>
        <select value={name} onChange={selectName}>
          {authors.map(author => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <br />
        <label>born</label>
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
