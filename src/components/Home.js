import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/style.css";
import Hero from "./Hero";
import ArticleList from "./ArticleList";
import Pagination from "./Pagination";
import Feedbar from "./Feedbar";
import Loader from "./loader/Loader";
import { articleLimit } from "../utils/constant";

function HomePage(props) {
  const navigate = useNavigate();
  const {
    loading, fetchArticles, currentPage, currentTag, isLoggedIn,
  } = props;
  const { pathname } = useLocation();
  const customFeed = pathname.includes("feed");

  useEffect(() => {
    const feedParam = customFeed && isLoggedIn ? "/feed" : "";
    const offsetParam = currentPage > 1 ? `?offset=${(currentPage - 1) * articleLimit}` : "";
    const tagParam = currentTag ? `?tag=${currentTag}` : "";

    const fetchParams = feedParam + tagParam + offsetParam;

    fetchArticles(fetchParams);
  }, [currentPage, currentTag, customFeed]);

  return (
    <>
      <Hero />
      <section className="feed container-90">
        <Feedbar {...props} customFeed={customFeed} />
        {loading ? (
          <Loader />
        ) : (
          <>
            <ArticleList {...props} navigate={navigate} />
            <Pagination {...props} />
          </>
        )}
      </section>
    </>
  );
}

export default HomePage;
