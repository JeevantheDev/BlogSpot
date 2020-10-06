import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";

const SignedoutLinks = () => {
  let isNetwork;
  if (navigator.onLine) {
    isNetwork = true;
  } else {
    isNetwork = false;
  }
  return (
    <Fragment>
      <ul className="right hide-on-med-and-down">
        {isNetwork ? (
          <li>
            <NavLink to="/signin">Login</NavLink>
          </li>
        ) : (
          <li>
            <a className="disabled" href="#">
              Login
            </a>
          </li>
        )}
      </ul>
      <ul className="right sidenav pad-1" id="mobile-demo">
        {isNetwork ? (
          <Fragment>
            <Search />
            <li>
              <NavLink to="/signin">Login</NavLink>
            </li>
          </Fragment>
        ) : (
          <li>
            <a className="disabled" href="#">
              Login
            </a>
          </li>
        )}
      </ul>
    </Fragment>
  );
};

export default SignedoutLinks;
