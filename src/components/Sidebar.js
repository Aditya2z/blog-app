import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar(props) {
  const { articles, setCurrentTag } = props;
  const navigate = useNavigate();

  let tags = new Set();

  articles.forEach((obj) => {
    obj.article.taglist.forEach((tag) => {
      tags.add(tag);
    });
  });
  tags = Array.from(tags);

  return (
    <aside className="flex-24 tags">
      <p className="text">Popular Tags:</p>
      {tags.map((tag) => (
        <button
          type="button"
          className="btn-1"
          key={tag}
          onClick={(event) => {
            setCurrentTag(event.target.innerText);
            navigate("/");
          }}
        >
          {tag}
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;
