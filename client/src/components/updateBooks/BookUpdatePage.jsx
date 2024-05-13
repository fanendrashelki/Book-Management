import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../../../config";

const BookUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [loading, setLoading] = useState(true); // Initially set to true
  const [submitting, setSubmitting] = useState(false); // Initially set to false

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getone/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // After data fetching is complete, set loading to false
      }
    };
    fetchData();
  }, [id]); // Make sure to include id in dependency array

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.genre) {
      toast.error("Please fill in all fields", { position: "top-right" });
      return;
    }

    setSubmitting(true); // Start submitting loader

    axios
      .put(`${BASE_URL}/update/${id}`, formData)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setSubmitting(false); // Stop submitting loader
        setFormData({
          title: "",
          author: "",
          genre: "",
        });
      });
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-3">
              <h2>Update Book </h2>
            </div>
            <div className="col-lg-6 col-md-6 text-lg-end text-md-end">
              <Link to={"/"} className="btn btn-success">
                <i className="fa-solid fa-circle-left"></i> Back
              </Link>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
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
                className="form-control"
                id="author"
                name="author"
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
                className="form-control"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookUpdatePage;
