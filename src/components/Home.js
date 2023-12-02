import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/style.css";
import ArticleList from "./ArticleList";
import Pagination from "./Pagination";
import { articleUrl } from "../utils/constant";

function HomePage(props) {
  const { articles, onReadMoreClick, fetchArticles } = props;
  const [clickedTag, setTag] = useState(null);

  let tags = new Set();

  articles.forEach((obj) => {
    obj.article.taglist.forEach((tag) => {
      tags.add(tag);
    });
  });
  tags = Array.from(tags);

  const fetchTagArticles = (event) => {
    const tag = event.target.innerText;
    setTag(tag);

    fetchArticles(`${articleUrl}?tag=${tag}`);
  };

  return (
    <>
      <section className="hero">
        <h1>Conduit</h1>
        <p className="sub-heading">A place to share your knowledge</p>
      </section>
      <section className="feed container-90">
        <div className="feed-bar flex">
          <NavLink
            to="/"
            activeclassname={clickedTag ? "" : "active"}
            className="global-feed"
            tabIndex={0}
            onClick={() => {
              fetchArticles(articleUrl);
              setTag(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchArticles(articleUrl);
                setTag(null);
              }
            }}
          >
            Global Feed
          </NavLink>
          {clickedTag && (
            <NavLink
              to="/"
              activeclassname="active"
              className="tag-feed"
              tabIndex={0}
            >
              #
              {" "}
              {clickedTag}
            </NavLink>
          )}
        </div>
        <div className="flex justify-between">
          <div className="articles flex-74">
            {articles.map((article) => (
              <ArticleList
                {...article}
                key={article.article.slug}
                onReadMoreClick={onReadMoreClick} // Pass callback
              />
            ))}
          </div>
          <aside className="flex-24 tags">
            <p className="text">Popular Tags:</p>
            {tags.map((tag) => (
              <button
                type="button"
                className="btn-1"
                key={tag}
                onClick={fetchTagArticles}
              >
                {tag}
              </button>
            ))}
          </aside>
        </div>
        <Pagination {...props} />
      </section>
    </>
  );
}

export default HomePage;
