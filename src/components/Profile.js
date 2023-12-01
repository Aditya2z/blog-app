import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { profileUrl } from "../utils/constant";
import Loader from "./loader/Loader";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${profileUrl}/${id}`)
      .then((res) => res.json())
      .then((profileData) => {
        setProfile(profileData.profile);
      })
      .catch((err) => {
        setError(err);
      });
  }, [id]); // Include id as a dependency to re-run the effect when id changes

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  if (!profile) {
    return <Loader />;
  }

  const {
    username, following, image, bio,
  } = profile;

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
          <button type="button" className="follow-btn">
            {following ? "Unfollow -" : "Follow +"}
          </button>
        </div>
      </section>
      {/* <section className="feed container-90">
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
      </section> */}
    </>
  );
}

export default Profile;
