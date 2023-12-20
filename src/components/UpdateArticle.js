import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articleUrl, localStorageKey } from "../utils/constant";
import Loader from "./loader/Loader";
import "../styles/style.css";

function UpdateArticle(props) {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    body: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    body: "",
    other: "",
  });

  const { isLoggedIn, user, setError } = props;
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();
  const storageKey = localStorage.getItem(localStorageKey);

  useEffect(() => {
    fetch(`${articleUrl}/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw response.text();
        }
        return response.json();
      })
      .then((data) => {
        const fetchedArticle = data.article.article;

        setCurrentArticle(fetchedArticle);
        setArticle({
          title: fetchedArticle.title || "",
          description: fetchedArticle.description || "",
          body: fetchedArticle.body || "",
        });

        setLoading(false);
      })
      .catch((errorPromise) => {
        errorPromise.then((errorText) => {
          setError(errorText);
          setLoading(false);
        });
      });
  }, [slug]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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

  const updateArticle = (event) => {
    const isAuthor = (user.username === currentArticle.author.username);
    event.preventDefault();

    const isValid = validateForm();

    if (isValid && isLoggedIn && isAuthor) {
      fetch(`${articleUrl}/${currentArticle.slug}`, {
        method: "PUT",
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
    } else {
      navigate(`/articles/${slug}`);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!currentArticle) {
    return <div>Article not found</div>;
  }

  return (
    <div className="newarticle-container">
      <h1 className="newarticle-heading">Update Article</h1>
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

        <span className="error">{errors.other}</span>

        <button
          type="submit"
          onClick={(event) => updateArticle(event)}
          className="btn-2"
        >
          Update Article
        </button>
      </form>
    </div>
  );
}

export default UpdateArticle;
