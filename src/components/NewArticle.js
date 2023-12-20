import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { articleUrl, localStorageKey } from "../utils/constant";
import "../styles/style.css";

function NewArticle() {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    body: "",
    taglist: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    body: "",
    other: "",
  });

  const navigate = useNavigate();
  const storageKey = localStorage.getItem(localStorageKey);

  const handleInputChange = (event) => {
    const { name } = event.target;
    let value;
    if (name === "taglist") {
      value = event.target.value.split(",").map((tag) => tag.trim());
    } else {
      value = event.target.value;
    }
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      body: "",
      other: "",
    };

    if (!article.title) {
      newErrors.title = "Title is required";
    }

    if (!article.description) {
      newErrors.description = "Description is required";
    }

    if (!article.body) {
      newErrors.body = "Body is required";
    }

    setErrors(newErrors);

    return !(newErrors.title || newErrors.description || newErrors.body);
  };

  const createArticle = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      fetch(articleUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: storageKey,
        },
        body: JSON.stringify({ article }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response.text();
        })
        .then((data) => {
          navigate(`/articles/${data.article.article.slug}`);
        })
        .catch((errorPromise) => {
          errorPromise.then((errorText) => {
            setErrors({ ...errors, other: errorText });
          });
        });
    }
  };

  return (
    <div className="newarticle-container">
      <h1 className="newarticle-heading">New Article</h1>
      <form id="articleForm">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="input-field"
            value={article.title}
            onChange={handleInputChange}
            required
          />
          <span className="error">{errors.title}</span>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            className="input-field"
            value={article.description}
            onChange={handleInputChange}
            required
          />
          <span className="error">{errors.description}</span>
        </div>

        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            className="input-field"
            rows="4"
            value={article.body}
            onChange={handleInputChange}
            required
          />
          <span className="error">{errors.body}</span>
        </div>

        <div className="form-group">
          <label htmlFor="taglist">Tags (comma-separated):</label>
          <input
            type="text"
            id="taglist"
            name="taglist"
            className="input-field"
            value={article.taglist}
            onChange={handleInputChange}
          />
        </div>

        <span className="error">{errors.other}</span>

        <button type="submit" onClick={(event) => createArticle(event)} className="btn-2">
          Create Article
        </button>
      </form>
    </div>
  );
}

export default NewArticle;
