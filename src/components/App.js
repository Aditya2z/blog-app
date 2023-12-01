import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./loader/Loader";
import Header from "./Header";
import HomePage from "./Home";
import LoginPage from "./Login";
import SignupPage from "./Signup";
import NoMatch from "./NoMatch";
import SingleArticle from "./SingleArticle";
import Profile from "./Profile";
import { articleUrl } from "../utils/constant";

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [clickedArticle, setClickedArticle] = useState(null);

  useEffect(() => {
    fetch(articleUrl)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleReadMoreClick = (article) => {
    setClickedArticle(article);
  };

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            articles.length ? (
              <HomePage
                articles={articles}
                onReadMoreClick={handleReadMoreClick}
              />
            ) : (
              <Loader />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/articles/:slug"
          element={<SingleArticle article={clickedArticle} />}
        />
        <Route path="/profiles/:id" element={<Profile />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
