import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { articleUrl } from "../utils/constant";
import Loader from "./loader/Loader";

function SingleArticle(props) {
  const [loading, setLoading] = useState(!props.article);
  const [error, setError] = useState(null);
  const [fetchedArticle, setFetchedArticle] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (!props.article) {
      fetch(`${articleUrl}/${slug}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch article");
          }
          return res.json();
        })
        .then((data) => {
          setFetchedArticle(data.article.article);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [props.article]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  if (!props.article && !fetchedArticle) {
    return <div>Article not found</div>;
  }

  const {
    title, body, taglist, createdAt, author,
  } = props.article || fetchedArticle;

  return (
    <article className="single-article">
      <section className="hero">
        <h1>{title}</h1>
        <div className="article-author flex justify-between align-center">
          <div>
            <Link to={`/profiles/${author.username}`} className="flex align-center user">
              <div className="avatar">
                <img
                  src={author.image ? author.image : "/images/user-solid.svg"}
                  alt={author.username}
                />
              </div>
              <p className="author">{author.username}</p>
            </Link>
            <p className="date">{new Date(createdAt).toDateString()}</p>
          </div>
        </div>
      </section>
      <p className="article-body">{body}</p>
      <div className="tag-list">
        Tags:
        {taglist.map((tag) => (
          <span key={tag} className="tag btn-1">
            {tag}
          </span>
        ))}
      </div>
      <p className="article-footer">
        <Link to="/login" className="accent">
          Sign in
          {" "}
        </Link>
        or
        <Link to="/signup" className="accent">
          Sign Up
          {" "}
        </Link>
        to add comments on this article.
      </p>
    </article>
  );
}

export default SingleArticle;
