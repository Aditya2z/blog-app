import React from "react";
import { Link } from "react-router-dom";
import Like from "./Like";
import "../styles/style.css";

function ArticleList(props) {
  const { article, onReadMoreClick } = props;
  const {
    title, description, createdAt, favoritesCount, slug, taglist,
  } = article;

  return (
    <article className="article">
      <div className="article-author flex justify-between align-center">
        <div>
          <Link
            to={`/profiles/${article.author.username}`}
            className="flex align-center user"
          >
            <span className="avatar">
              <img
                src={article.author.image || "/images/user-solid.svg"}
                alt={article.author.username}
              />
            </span>
            <p className="author">{article.author.username}</p>
          </Link>
          <p className="date">{new Date(createdAt).toDateString()}</p>
        </div>
        <Like likes={favoritesCount} />
      </div>
      <Link
        to={`/articles/${slug}`}
        className="article-link"
        onClick={() => onReadMoreClick(article)}
      >
        <h3>{title}</h3>
        <p className="text">{`${description}...`}</p>
      </Link>
      <div className="article-footer flex justify-between">
        <Link
          to={`/articles/${slug}`}
          className="btn"
          onClick={() => onReadMoreClick(article)}
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

export default ArticleList;
