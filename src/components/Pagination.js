import React from "react";

function Pagination(props) {
  const totalPages = Math.ceil(props.articles.length / 10);

  return (
    <div className="pagination">
      <button type="button" className="btn-1">
        ⬅Previous
      </button>
      {Array.from({ length: totalPages }, (anyVariable, index) => (
        <button type="button" key={index + 1} className="btn-1">
          {index + 1}
        </button>
      ))}
      <button type="button" className="btn-1">
        Next➡
      </button>
    </div>
  );
}

export default Pagination;
