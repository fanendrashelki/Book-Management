import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../../../config";

import "./Book.css";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // Initially set to true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getall`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // After data fetching is complete, set loading to false
      }
    };
    fetchData();
  }, []);

  const deleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) => {
    const { title, author, genre } = book;
    const searchLower = searchQuery.toLowerCase();
    return (
      title.toLowerCase().includes(searchLower) ||
      author.toLowerCase().includes(searchLower) ||
      genre.toLowerCase().includes(searchLower)
    );
  });

  // Calculate total number of pages based on filtered books
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // Get current page of books
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-3 ">
              <input
                className="search-input"
                type="text"
                placeholder="Search by title, author, or genre"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 text-lg-end text-md-end">
              <Link to={"/add"} className="btn btn-success">
                <i className="fa-solid fa-plus"></i> Add Book
              </Link>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          {loading ? ( // Check if loading is true, if true, show loader
            <div className="loader">Loading...</div>
          ) : filteredBooks.length === 0 ? ( // If loading is false and no books found, display message
            <p>No books found.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S.NO</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((book, index) => (
                  <tr key={book._id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>
                      <Link to={`/edit/${book._id}`} className="action-link">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button
                        onClick={() => deleteBook(book._id)}
                        className="action-btn"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Pagination */}
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Book;
