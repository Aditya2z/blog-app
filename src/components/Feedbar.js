import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../styles/style.css";

function Feedbar(props) {
  const {
    currentTag,
    setCurrentTag,
    isLoggedIn,
    customFeed,
    setCurrentPage,
  } = props;

  const { authorid } = useParams();
  const { pathname } = useLocation();
  const favorited = pathname.includes("favorites");

  return (
    <div className="feed-bar flex">
      {!pathname.includes("profiles") && (
        <>
          {isLoggedIn && (
            <Link
              to="/feed"
              className={`custom-feed ${customFeed ? "active" : ""}`}
              tabIndex={0}
              onClick={() => {
                setCurrentTag(null);
                setCurrentPage(1);
              }}
            >
              Your Feed
            </Link>
          )}
          <Link
            to="/"
            className={`global-feed ${
              currentTag || customFeed ? "" : "active"
            }`}
            tabIndex={0}
            onClick={() => {
              setCurrentTag(null);
              setCurrentPage(1);
            }}
          >
            Global Feed
          </Link>
          {currentTag && (
            <Link
              to="/"
              className={`tag-feed ${currentTag ? "active" : ""}`}
              tabIndex={0}
            >
              #&nbsp;
              {currentTag}
            </Link>
          )}
        </>
      )}

      {pathname.includes("profiles") && (
        <>
          <Link
            to={`/profiles/${authorid}`}
            className={`author-feed ${favorited ? "" : "active"}`}
            tabIndex={0}
          >
            My Articles
          </Link>
          <Link
            to={`/profiles/${authorid}/favorites`}
            className={`author-feed ${favorited ? "active" : ""}`}
            tabIndex={0}
          >
            Liked Articles
          </Link>
        </>
      )}
    </div>
  );
}

export default Feedbar;
