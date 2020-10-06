import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect, Link } from "react-router-dom";
import EditorArea from "../editor/EditorArea";

class CreateProject extends Component {
  state = {
    title: "",
    slug: "",
    category: "",
    image: "",
    content: "",
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <Fragment>
        <nav className="transparent z-depth-0">
          <div className="nav-wrapper container">
            <div className="col s12">
              <Link to="/" className="breadcrumb grey-text text-darken-2">
                Dashboard
              </Link>
              <a href="#" className="breadcrumb blue-text text-darken-2">
                New Blog
              </a>
            </div>
          </div>
        </nav>
        <div style={{ padding: "0" }} className="container section">
          <EditorArea id="" content="" state={this.state} type="create" />
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
