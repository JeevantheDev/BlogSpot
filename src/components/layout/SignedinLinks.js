import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";
import { connect } from "react-redux";
import Search from "./Search";

const SignedinLinks = (props) => {
  let isNetwork;
  if (navigator.onLine) {
    isNetwork = true;
  } else {
    isNetwork = false;
  }
  return (
    <Fragment>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/create">New Blog</NavLink>
        </li>
        <li>
          <a onClick={props.signOut}>Log Out</a>
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating pink lighten-1">
            <img className="avatar" src={props.profile.avatar} alt="" />
          </NavLink>
        </li>
      </ul>
      <ul className="right sidenav pad-1" id="mobile-demo">
        {isNetwork ? <Search /> : null}
        <li>
          <NavLink to="/create">New Blog</NavLink>
        </li>
        <li>
          <a onClick={props.signOut}>Log Out</a>
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating pink lighten-1">
            <img className="avatar" src={props.profile.avatar} alt="" />
          </NavLink>
        </li>
      </ul>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedinLinks);
