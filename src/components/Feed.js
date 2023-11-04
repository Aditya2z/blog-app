/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import "../styles/style.css";
import ArticleList from "./ArticleList";

function Feed(props) {
  const { articles } = props;

  let tags = new Set();

  articles.forEach((obj) => {
    obj.article.taglist.forEach((tag) => {
      tags.add(tag);
    });
  });
  tags = Array.from(tags);

  return (
    <section className="feed container-90">
      <div className="global-feed">Global Feed</div>
      <div className="flex justify-between">
        <div className="articles flex-74">
          {articles.map((obj) => (
            <ArticleList {...obj} key={obj.article.slug} />
          ))}
        </div>
        <aside className="flex-24 tags">
          <p className="text">Popular Tags:</p>
          {tags.map((tag) => (
            <button type="button" className="btn-1" key={tag}>
              {tag}
            </button>
          ))}
        </aside>
      </div>
    </section>
  );
}

export default Feed;
