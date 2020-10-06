import React from "react";
import noImg from "../../img/noImg.svg";

const Offline = () => {
  return (
    <div className="col s12 m6 section mar-y">
      <div className="card z-depth-1 section blue-grey">
        <div className="card-content">
          <img src={noImg} alt="404 page" />
          <span className="white-text custom-align custom-font">
            <i>Sorry, You are Offline</i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Offline;
