import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../../../config";

const BookAddPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.genre) {
      toast.error("Please fill in all fields", { position: "top-right" });
      return;
    }

    setLoading(true); // Start loader

    try {
      const response = await axios.post(`${BASE_URL}/create`, formData);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
      });
    }

    setLoading(false); // Stop loader
    setFormData({
      title: "",
      author: "",
      genre: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-3">
              <h2>Add Book </h2>
            </div>
            <div className="col-lg-6 col-sm-6 text-lg-end text-md-end">
              <Link to={"/"} className="btn btn-success">
                <i className="fa-solid fa-circle-left"></i> Back
              </Link>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              name="author"
              className="form-control"
              id="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genre" className="form-label">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              className="form-control"
              id="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAddPage;
