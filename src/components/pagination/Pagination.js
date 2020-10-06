import React from "react";

const Pagination = ({ dataPerPage, totalData, paginate, page }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  var maxNum;
  pageNumbers.forEach((page) => {
    maxNum = Math.max(page);
  });
  return (
    <div>
      <ul class="pagination">
        <li className={page === 1 ? "disabled" : ""}>
          {page !== 1 ? (
            <a onClick={() => paginate(page - 1)} href={`#page=${page}`}>
              <i class="material-icons">chevron_left</i>
            </a>
          ) : (
            <a href={`#page=${page}`}>
              <i class="material-icons">chevron_left</i>
            </a>
          )}
        </li>
        {pageNumbers.map((number) => {
          return (
            <li key={number} className={page === number ? "active" : ""}>
              <a onClick={() => paginate(number)} href={`#page=${number}`}>
                {number}
              </a>
            </li>
          );
        })}

        <li className={page === maxNum ? "disabled" : ""}>
          {page !== maxNum ? (
            <a onClick={() => paginate(page + 1)} href={`#page=${page}`}>
              <i class="material-icons">chevron_right</i>
            </a>
          ) : (
            <a href={`#page=${page}`}>
              <i class="material-icons">chevron_right</i>
            </a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
