import React, { Component, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import EditorArea from "../editor/EditorArea";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import MetaTags from "../metaTags/MetaTags";

const UpdateProject = (props) => {
  const state = {
    key: "",
    slug: "",
    title: "",
    image: "",
    category: "",
    content: "",
  };
  const { auth, project, id } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <Fragment>
      <MetaTags
        title={project.title}
        description={project.title}
        authorName={project.authorImage}
        image={project.image}
        url={window.location.href}
      />
      <nav className="transparent z-depth-0">
        <div className="nav-wrapper container">
          <div className="col s12">
            <Link to="/" className="breadcrumb grey-text text-darken-2">
              Dashboard
            </Link>
            <a href="#" className="breadcrumb blue-text text-darken-2">
              Update Blog
            </a>
          </div>
        </div>
      </nav>
      <div style={{ padding: "0" }} className="container section">
        <EditorArea
          id={id}
          content={project ? project : ""}
          state={state}
          type="update"
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    id: id,
    project: project,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "projects" }])
)(UpdateProject);
