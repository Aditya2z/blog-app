/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import "../styles/style.css";

function Like(props) {
  const { likes } = props;

  return (
    <div className="like flex justify-between">
      <p>❤</p>
      <p>{likes}</p>
    </div>
  );
}

export default Like;
