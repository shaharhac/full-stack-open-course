import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GENRE_LIST, GENRE_BOOKS } from "../queries";
import BookTable from "./BookTable";

const Books = () => {
  const [genre, setGenre] = useState("all");
  const [genreList, setGenreList] = useState([]);
  const genreResult = useQuery(GENRE_LIST);
  const [fetchBooks, result] = useLazyQuery(GENRE_BOOKS, {
    variables: {
      genre: genre !== "all" ? genre : null
    }
  });

  useEffect(() => {
    fetchBooks();
  }, [genre, fetchBooks]);

  useEffect(() => {
    if (genreResult.data) {
      const genreSet = new Set();
      genreSet.add("all");
      genreResult.data.allBooks.forEach(book => {
        book.genres.forEach(genre => {
          genreSet.add(genre);
        });

        setGenreList(Array.from(genreSet));
      });
    }
  }, [genreResult.data]);

  if (!result.called || result.loading || genreResult.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const handleSelection = event => {
    setGenre(event.target.textContent);
  };

  return (
    <div>
      <h2>books</h2>
      {genre !== "all" ? (
        <span>
          in genre <strong>{genre}</strong>
        </span>
      ) : (
        <span>displaying all genres</span>
      )}
      <BookTable bookList={books} />
      {Array.from(genreList).map(genre => (
        <button key={genre} onClick={handleSelection}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
