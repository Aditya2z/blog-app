import React from "react";
import "../styles/style.css";
import ArticleList from "./ArticleList";
import Pagination from "./Pagination";

function HomePage(props) {
  const { articles, onReadMoreClick } = props;

  let tags = new Set();

  articles.forEach((obj) => {
    obj.article.taglist.forEach((tag) => {
      tags.add(tag);
    });
  });
  tags = Array.from(tags);

  return (
    <>
      <section className="hero">
        <h1>Conduit</h1>
        <p className="sub-heading">A place to share your knowledge</p>
      </section>
      <section className="feed container-90">
        <div className="global-feed">Global Feed</div>
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
              <button type="button" className="btn-1" key={tag}>
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
