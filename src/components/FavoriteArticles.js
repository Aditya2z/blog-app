import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "./loader/Loader";
import Feedbar from "./Feedbar";
import ArticleList from "./ArticleList";
import Pagination from "./Pagination";
import NoAuthentication from "./NoAuthentication";
import {
  articleUrl, profileUrl, articleLimit, localStorageKey,
} from "../utils/constant";

function FavoriteArticles(props) {
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const storageKey = localStorage.getItem(localStorageKey) || "";

  const { authorid } = useParams();
  const {
    setError,
    currentAuthor,
    currentTag,
    isLoggedIn,
    user,
  } = props;

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
        }
      })
      .catch((errorPromise) => {
        errorPromise.then((errorText) => {
          setError(errorText);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(`${profileUrl}/${authorid}`)
      .then((res) => res.json())
      .then((profileData) => {
        setProfile(profileData.profile);
      })
      .catch((err) => {
        setError(err);
      });
    const offsetParam = currentPage > 1 ? `&offset=${(currentPage - 1) * articleLimit}` : "";
    const favoritedParam = authorid ? `?favorited=${authorid}` : "";

    const fetchParams = favoritedParam + offsetParam;

    fetchArticles(fetchParams);
  }, [currentPage, currentTag, currentAuthor]);

  if (!profile) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <NoAuthentication />;
  }

  const {
    username, following, image, bio,
  } = profile;

  const followUser = (authorname) => {
    let method = "POST";
    if (following) {
      method = "DELETE";
    }
    if (isLoggedIn) {
      fetch(`${profileUrl}/${authorname}/follow`, {
        method,
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
          if (data.profile) {
            setProfile(data.profile);
            navigate(`/profiles/${data.profile.username}`);
          }
        })
        .catch((errorPromise) => {
          errorPromise.then((errorText) => {
            setError(errorText);
          });
        });
    }
  };

  return (
    <>
      <section className="hero">
        <div className="author-profile flex justify-between align-center flex-column">
          <div>
            <div className="profile-avatar">
              <img src={image || "/images/user-solid.svg"} alt={username} />
            </div>
            <h1>{username.toUpperCase()}</h1>
            <p>{bio}</p>
          </div>
          <div className="flex">
            {((isLoggedIn && (user.username !== profile.username)) || !isLoggedIn) && (
            <button
              type="button"
              className="follow-btn"
              onClick={() => {
                followUser(username);
              }}
            >
              {following ? "Unfollow -" : "Follow +"}
            </button>
            )}
            {isLoggedIn && (user.username === profile.username) && (
              <Link to="/profiles/settings" className="follow-btn">
                Profile Settings⚙
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="feed container-90">
        <Feedbar {...props} />
        {loading ? (
          <Loader />
        ) : (
          <>
            <ArticleList {...props} articles={articles} navigate={navigate} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </section>
    </>
  );
}

export default FavoriteArticles;
