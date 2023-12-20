import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "./loader/Loader";
import Like from "./Like";
import { articleUrl, localStorageKey } from "../utils/constant";

function SingleArticle(props) {
  const {
    currentArticle,
    fetchArticles,
    loading,
    isLoggedIn,
    user,
    setError,
  } = props;

  const { slug } = useParams();
  const navigate = useNavigate();
  const storageKey = localStorage.getItem(localStorageKey) || "";

  const deleteArticle = () => {
    const isAuthor = (user.username === currentArticle.author.username);

    if (isLoggedIn && isAuthor) {
      fetch(`${articleUrl}/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: storageKey,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response.text();
        })
        .then(() => {
          navigate("/");
        })
        .catch((errorPromise) => {
          errorPromise.then((errorText) => {
            setError({ errorText });
          });
        });
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchParams = `/${slug}`;

    fetchArticles(fetchParams);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!currentArticle) {
    return <div>Article not found</div>;
  }

  const {
    title, body, taglist, createdAt, author,
  } = currentArticle;

  let isAuthor = false;
  if (isLoggedIn) {
    isAuthor = (user.username === currentArticle.author.username);
  }

  return (
    <div className="single-article conatiner-90">
      <article>
        <section className="hero">
          <h1>{title}</h1>
          <div className="article-author flex justify-between align-center">
            <div>
              <Link
                to={`/profiles/${author.username}`}
                className="flex align-center user"
              >
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
            {isLoggedIn && (
              <div className="flex justify-between align-center flex-10">
                <Like {...props} article={currentArticle} />
                {isAuthor && (
                  <>
                    <Link to={`/articles/${slug}/edit`} className="edit-btn">Edit</Link>
                    <Link to="/feed" className="delete-btn" onClick={deleteArticle}>Delete</Link>
                  </>
                )}
              </div>
            )}
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
        {!isLoggedIn && (
        <p className="article-footer">
          <Link to="/login" className="accent">
            Sign in
          </Link>
          &nbsp;or&nbsp;
          <Link to="/signup" className="accent">
            Sign Up
          </Link>
          &nbsp;to like this article.
        </p>
        )}
      </article>
    </div>
  );
}

export default SingleArticle;
