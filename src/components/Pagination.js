import React from "react";

function Pagination(props) {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
  } = props;

  const handlePreviousBtn = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextBtn = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageBtn = (page) => {
    setCurrentPage(Number(page));
  };

  return (
    <div className="pagination">
      <button
        type="button"
        className="btn-1"
        onClick={handlePreviousBtn}
      >
        ⬅Previous
      </button>
      {Array.from({ length: totalPages }, (anyVariable, index) => (
        <button
          key={index + 1}
          type="button"
          className={`btn-1 ${index + 1 === currentPage ? "active-page" : ""}`}
          onClick={(event) => {
            handlePageBtn(event.target.innerText);
          }}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        className="btn-1"
        onClick={handleNextBtn}
      >
        Next➡
      </button>
    </div>
  );
}

export default Pagination;
