import React from "react";
import { Link } from "react-router-dom";
import Like from "./Like";
import "../styles/style.css";

function ArticleCard(props) {
  const {
    article, setCurrentAuthor, setCurrentTag, setCurrentPage, setCurrentArticle,
  } = props;

  const {
    title, description, createdAt, slug, taglist, author,
  } = article;

  return (
    <article className="article">
      <div className="article-author flex justify-between align-center">
        <div
          tabIndex={0}
          role="button"
          onClick={() => {
            setCurrentTag(null);
            setCurrentPage(1);
            setCurrentAuthor(author.username);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCurrentTag(null);
              setCurrentPage(1);
              setCurrentAuthor(author.username);
            }
          }}
        >
          <Link
            to={`/profiles/${author.username}`}
            className="flex align-center user"
          >
            <span className="avatar">
              <img
                src={author.image || "/images/user-solid.svg"}
                alt={author.username}
              />
            </span>
            <p className="author">{author.username}</p>
          </Link>
          <p className="date">{new Date(createdAt).toDateString()}</p>
        </div>
        <Like {...props} />
      </div>
      <Link
        to={`/articles/${slug}`}
        className="article-link"
        onClick={() => { setCurrentArticle(article); }}
      >
        <h3>{title}</h3>
        <p className="text">{`${description}...`}</p>
      </Link>
      <div className="article-footer flex justify-between">
        <Link
          to={`/articles/${slug}`}
          className="btn"
          onClick={() => fetch}
        >
          Read More...
        </Link>
        <div className="tag-list">
          {taglist.map((tag) => (
            <span key={tag} className="tag btn-3">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
