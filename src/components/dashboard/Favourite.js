import React, { useState, Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Pagination from "../pagination/Pagination";

const Favourite = (props) => {
  const { favourites } = props;
  const [data, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(4);

  useEffect(() => {
    if (favourites) {
      setDatas(favourites);
    }
  }, [favourites]);

  const indexLast = currentPage * dataPerPage;
  const indexFast = indexLast - dataPerPage;
  const currentData = data.slice(indexFast, indexLast);

  const paginate = (number) => setCurrentPage(number);
  if (favourites.length > 0) {
    return (
      <Fragment>
        <div className="section">
          {/* <div className="devider"></div> */}
          <ul className="notifications collection z-depth-1 ">
            {currentData &&
              currentData.map((item) => {
                return (
                  <li class="collection-item avatar">
                    <img
                      src={item.authorImage}
                      alt="display image"
                      class="circle"
                    />
                    <div className="center-btn">
                      <span class="title">{item.title}</span>
                      <span className="teal white-text p-2 z-depth-1">
                        {item.category}
                      </span>
                    </div>
                    <Link
                      to={`/saved/${item.id}`}
                      class="secondary-content teal-text"
                    >
                      <i class="material-icons">read_more</i>
                    </Link>
                  </li>
                );
              })}
          </ul>
          {data.length > 4 ? (
            <Pagination
              dataPerPage={dataPerPage}
              totalData={data.length}
              paginate={paginate}
              page={currentPage}
            />
          ) : null}
        </div>
      </Fragment>
    );
  } else {
    return (
      <div className="card-panel">
        <span className="card-title">No Blogs marked as Favourite</span>
      </div>
    );
  }
};

export default Favourite;
