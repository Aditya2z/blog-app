import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import { articleUrl, localStorageKey } from "../utils/constant";

function Like(props) {
  const {
    article, isLoggedIn, setError,
  } = props;
  const navigate = useNavigate();

  const { favoritesCount, favorited, slug } = article;
  const storageKey = localStorage.getItem(localStorageKey);

  const [likes, setLikes] = useState(favoritesCount);
  const [liked, setLiked] = useState(favorited);

  const LikeArticle = (articleSlug) => {
    let method = "POST";
    if (favorited) {
      method = "DELETE";
    }
    if (isLoggedIn) {
      fetch(`${articleUrl}/${articleSlug}/favorite`, {
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
        .catch((errorPromise) => {
          errorPromise.then((errorText) => {
            setError(errorText);
          });
        });
    }
  };

  return (
    <button
      type="button"
      className={`like flex ${liked ? "active" : ""}`}
      onClick={() => {
        if (isLoggedIn) {
          setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
          setLiked(!liked);
          LikeArticle(slug);
        } else {
          navigate("/login");
        }
      }}
    >
      <p>❤&nbsp;</p>
      <p>{likes}</p>
    </button>
  );
}

export default Like;
