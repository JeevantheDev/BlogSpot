import React, { Fragment } from "react";
import { signUpLoginGoogle } from "../../store/actions/authActions";
import { connect } from "react-redux";

const GoogleSignin = (props) => {
  const googleLogin = (e) => {
    e.preventDefault();
    props.signUpLoginGoogle();
  };
  return (
    <Fragment>
      <a
        onClick={googleLogin}
        class="button button--social-login button--google"
        href="#"
      >
        <i class="icon fab fa-google"></i>Login With Google
      </a>
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUpLoginGoogle: () => dispatch(signUpLoginGoogle()),
  };
};
export default connect(null, mapDispatchToProps)(GoogleSignin);
