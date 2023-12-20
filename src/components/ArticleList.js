import React from "react";
import ArticleCard from "./ArticleCard";
import Sidebar from "./Sidebar";
import "../styles/style.css";

function ArticleList(props) {
  const { articles } = props;

  if (articles === "no articles to show") {
    return <div className="no-articles">{`${articles} here... yet.`}</div>;
  }

  return (
    <div className="flex justify-between">
      <div className="articles flex-74">
        {articles.map((article) => (
          <ArticleCard key={article.article.slug} {...article} {...props} />
        ))}
      </div>
      <Sidebar articles={articles} {...props} />
    </div>
  );
}

export default ArticleList;
