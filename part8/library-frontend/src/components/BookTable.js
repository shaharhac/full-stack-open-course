import React from "react";
import BookRow from "./BookRow";

const BookTable = ({ bookList }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {bookList.map(book => (
            <BookRow key={book.id} book={book} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
