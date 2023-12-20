import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import HomePage from "./Home";
import LoginPage from "./Login";
import SignupPage from "./Signup";
import NoMatch from "./NoMatch";
import AlreadyLoggedIn from "./AlreadyAuthenticated";
import SingleArticle from "./SingleArticle";
import FavoriteArticles from "./FavoriteArticles";
import Profile from "./Profile";
import FullPageLoader from "./loader/FullPageLoader";
import NewArticle from "./NewArticle";
import UpdateUser from "./UpdateUser";
import NoAuthentication from "./NoAuthentication";
import UpdateArticle from "./UpdateArticle";
import ErrorPage from "./ErrorPage";
import {
  articleUrl,
  userVerifyUrl,
  articleLimit,
  localStorageKey,
} from "../utils/constant";

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTag, setCurrentTag] = useState(null);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);

  const storageKey = localStorage.getItem(localStorageKey);

  const updateUser = (data = null) => {
    setIsLoggedIn(!isLoggedIn);
    setUser(data);
    if (data && !localStorage[localStorageKey]) {
      localStorage.setItem(localStorageKey, data.token);
    }
  };

  useEffect(() => {
    if (storageKey) {
      fetch(userVerifyUrl, {
        method: "GET",
        headers: {
          Authorization: storageKey,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res.text();
        })
        .then((data) => {
          updateUser(data.user);
          setIsVerifying(false);
        })
        .catch((errorPromise) => {
          errorPromise.then((errorText) => {
            setError(errorText);
            setIsVerifying(false);
          });
        });
    } else {
      setIsVerifying(false);
    }
  }, []);

  const fetchArticles = (params = "") => {
    setLoading(true);

    fetch(`${articleUrl}${params}`, {
      method: "GET",
      headers: {
        Authorization: storageKey,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res.text();
        }
        return res.json();
      })
      .then((data) => {
        if (data === "no articles to show") {
          setArticles(data);
        } else {
          if (currentPage === 1 && data.articles) {
            setTotalPages(Math.ceil(data.articles.length / articleLimit));
          }
          if (data.articles) {
            setArticles(data.articles.slice(0, articleLimit));
          }
          if (data.article) {
            setCurrentArticle(data.article.article);
          }
        }
      })
      .catch((errorPromise) => {
        errorPromise.then((errorText) => {
          setError(errorText);
          setIsVerifying(false);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (error) {
    return (
      <>
        <Header isLoggedIn={isLoggedIn} user={user} updateUser={updateUser} />
        <ErrorPage error={error} />
      </>
    );
  }

  if (isVerifying) {
    return <FullPageLoader />;
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} user={user} updateUser={updateUser} />
      <Routes>
        <Route
          path="/"
          element={(
            <HomePage
              articles={articles}
              fetchArticles={fetchArticles}
              loading={loading}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
              setCurrentAuthor={setCurrentAuthor}
              setCurrentArticle={setCurrentArticle}
              isLoggedIn={isLoggedIn}
              user={user}
            />
          )}
        />
        <Route
          path="/feed"
          element={(
            <HomePage
              articles={articles}
              fetchArticles={fetchArticles}
              loading={loading}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
              setCurrentAuthor={setCurrentAuthor}
              setCurrentArticle={setCurrentArticle}
              isLoggedIn={isLoggedIn}
              user={user}
            />
          )}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <AlreadyLoggedIn /> : <LoginPage updateUser={updateUser} />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <AlreadyLoggedIn /> : <SignupPage updateUser={updateUser} />}
        />
        <Route
          path="/articles/new_article"
          element={isLoggedIn ? <NewArticle /> : <NoAuthentication />}
        />
        <Route
          path="/articles/:slug"
          element={(
            <SingleArticle
              currentArticle={currentArticle}
              fetchArticles={fetchArticles}
              loading={loading}
              isLoggedIn={isLoggedIn}
              user={user}
              setError={setError}
            />
          )}
        />
        <Route
          path="/articles/:slug/edit"
          element={<UpdateArticle isLoggedIn={isLoggedIn} user={user} setError={setError} />}
        />
        <Route
          path="/profiles/settings"
          element={isLoggedIn ? <UpdateUser user={user} /> : <NoAuthentication />}
        />
        <Route
          path="/profiles/:authorid/favorites"
          element={(
            <FavoriteArticles
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
              currentAuthor={currentAuthor}
              setCurrentAuthor={setCurrentAuthor}
              setCurrentArticle={setCurrentArticle}
              setError={setError}
              isLoggedIn={isLoggedIn}
              user={user}
            />
          )}
        />
        <Route
          path="/profiles/:authorid"
          element={(
            <Profile
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
              currentAuthor={currentAuthor}
              setCurrentAuthor={setCurrentAuthor}
              setCurrentArticle={setCurrentArticle}
              setError={setError}
              isLoggedIn={isLoggedIn}
              user={user}
            />
          )}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
