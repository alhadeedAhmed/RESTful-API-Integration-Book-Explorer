import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BooksList.css";

function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setShowAlert(false);

      const cachedBooks = localStorage.getItem(`books-page-${page}`);
      if (cachedBooks) {
        setTimeout(() => {
          setBooks(JSON.parse(cachedBooks));
          setLoading(false);
          setShowAlert(true);
        }, 1000);
      } else {
        try {
          const response = await axios.get(
            `https://openlibrary.org/search.json?author=Charles+Dickens&limit=10&page=${page}`
          );
          setTimeout(() => {
            setBooks(response.data.docs);
            localStorage.setItem(
              `books-page-${page}`,
              JSON.stringify(response.data.docs)
            );
            setLoading(false);
            setShowAlert(true);
          }, 1000);
        } catch (error) {
          setError("Error fetching data");
          setLoading(false);
        }
      }
    };

    fetchBooks();
  }, [page]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="books-list-container">
      {showAlert && (
        <div className="alert">Author Books successfully fetched!</div>
      )}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <div className="books-list">
        {books.map((book) => (
          <div key={book.key} className="book">
            <h2>{book.title}</h2>
            <p>{book.author_name?.join(", ")}</p>
            <p>{book.first_publish_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksList;
