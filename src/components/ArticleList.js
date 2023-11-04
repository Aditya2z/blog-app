/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
import React from "react";
import Like from "./Like";
import "../styles/style.css";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      x: null,
    };
  }

  render() {
    const {
      title,
      description,
      author,
      createdAt,
      // eslint-disable-next-line react/destructuring-assignment
    } = this.props.article;

    return (
      <article className="article">
        <div className="article-author flex justify-between align-center">
          <div>
            <div className="flex align-center user">
              <span className="avatar">
                <img src="./images/user-solid.svg" alt="" />
              </span>
              <p className="author">{author.username}</p>
            </div>
            <p className="date">{new Date(createdAt).toDateString()}</p>
          </div>
          <Like likes="likes" />
        </div>
        <div className="article-title">
          <h3>{title}</h3>
          <p className="text">{`${description}...`}</p>
        </div>
        <button type="button" className="btn">
          Read More...
        </button>
      </article>
    );
  }
}

export default ArticleList;
