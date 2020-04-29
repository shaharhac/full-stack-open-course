import React, { useEffect } from "react";
import BookTable from "./BookTable";
import { ME, GENRE_BOOKS } from "../queries";
import { useQuery, useLazyQuery } from "@apollo/client";

const Recommendations = () => {
  const userResult = useQuery(ME);
  const [fetchBooks, bookResult] = useLazyQuery(GENRE_BOOKS, {
    variables: {
      genre: userResult && userResult.data && userResult.data.me.favoriteGenre
    }
  });

  useEffect(() => {
    if (userResult.data) {
      fetchBooks();
    }
  }, [userResult.data, fetchBooks]);

  if (userResult.loading || !bookResult.called || bookResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <p>Books in your favorite genre {userResult.data.me.favoriteGenre}</p>
      <BookTable bookList={bookResult.data.allBooks} />
    </div>
  );
};

export default Recommendations;
