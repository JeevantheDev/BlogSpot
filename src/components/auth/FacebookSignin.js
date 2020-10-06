import React, { Fragment } from "react";
import { signUpLoginFacebook } from "../../store/actions/authActions";
import { connect } from "react-redux";

const FacebookSignin = (props) => {
  const facebookLogin = (e) => {
    e.preventDefault();
    props.signUpLoginFacebook();
  };
  return (
    <Fragment>
      <a
        onClick={facebookLogin}
        class="button button--social-login button--facebook"
        href="#"
      >
        <i class="icon fab fa-facebook"></i>Login With Facebook
      </a>
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUpLoginFacebook: () => dispatch(signUpLoginFacebook()),
  };
};
export default connect(null, mapDispatchToProps)(FacebookSignin);
