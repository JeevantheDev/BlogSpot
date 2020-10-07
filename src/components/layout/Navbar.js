import React from "react";
import { Link } from "react-router-dom";
import SignedinLinks from "./SignedinLinks";
import SignedoutLinks from "./SignedoutLinks";
import { connect } from "react-redux";
import M from "materialize-css";
import { useEffect } from "react";
import Search from "./Search";

const Navbar = (props) => {
  useEffect(() => {
    M.AutoInit();
  });
  const { auth, profile } = props;
  let isNetwork;
  if (navigator.onLine) {
    isNetwork = true;
  } else {
    isNetwork = false;
  }
  const links = auth.uid ? (
    <SignedinLinks profile={profile} />
  ) : (
    <SignedoutLinks />
  );
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Blog<span className="teal-text text-lighten-2">Spot</span>
        </Link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        {links}
        {isNetwork ? (
          <ul
            style={{ width: "50%", position: "relative" }}
            className="right hide-on-med-and-down"
          >
            <Search />
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
