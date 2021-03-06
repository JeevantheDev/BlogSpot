import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import GoogleSignin from "./GoogleSignin";
import FacebookSignin from "./FacebookSignin";
import GithubSignin from "./GithubSignin";
import "./Auth.css";
import MetaTags from "../metaTags/MetaTags";
class Signin extends Component {
  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container">
        <MetaTags title={"Login"} />
        <div style={{ margin: "2rem 0" }} className="custom-align">
          <form className="card z-depth-1">
            <div className="login-methods card-content">
              <h5 className="grey-text flow-text text-darken-3">
                Please <span className="teal-text">Login</span> here..
              </h5>
              <GoogleSignin />
              <FacebookSignin />
              <GithubSignin />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Signin);
