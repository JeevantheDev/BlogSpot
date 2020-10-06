import React, { Fragment } from "react";
import { signUpLoginGithub } from "../../store/actions/authActions";
import { connect } from "react-redux";

const GithubSignin = (props) => {
  const githubLogin = (e) => {
    e.preventDefault();
    props.signUpLoginGithub();
  };
  return (
    <Fragment>
      <a
        onClick={githubLogin}
        class="button button--social-login button--github"
        href="#"
      >
        <i class="icon fab fa-github"></i>Login With Github
      </a>
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUpLoginGithub: () => dispatch(signUpLoginGithub()),
  };
};
export default connect(null, mapDispatchToProps)(GithubSignin);
