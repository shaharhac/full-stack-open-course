import React from "react";

const BookRow = ({ book }) => {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  );
};

export default BookRow;
