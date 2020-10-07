import React, { Fragment } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteProject } from "../../store/actions/projectActions";
import { compose } from "redux";
import { Redirect, Link, withRouter } from "react-router-dom";
import moment from "moment";
import renderHTML from "react-render-html";
import { useState } from "react";
import { useEffect } from "react";
import Comments from "../comments/Comments";
import NoSSR from "react-no-ssr";
import MetaTags from "../metaTags/MetaTags";

const ProjectDetails = (props) => {
  const { project, auth, id } = props;
  const [save, setSave] = useState([]);
  const [flag, setFlag] = useState(false);
  const initState = (data, id) => {
    return [data].map((item) => ({
      ...item,
      id: id,
    }));
  };
  useEffect(() => {
    if (project && id) {
      const copy = initState(project, id);
      setSave(copy[0]);
    }
  }, [project]);
  useEffect(() => {
    getBlogs();
  });
  const getBlogs = () => {
    let blogs;
    if (window.localStorage.getItem("blogs") === null) {
      blogs = [];
    } else {
      blogs = JSON.parse(localStorage.getItem("blogs"));
      var found = false;
      for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].image === save.image) {
          found = true;
          break;
        }
      }
      if (found) {
        setFlag(true);
      }
    }
    return blogs;
  };
  const handleSave = (e) => {
    e.preventDefault();
    const blogs = getBlogs();
    if (blogs.length > 0) {
      if (flag) {
        blogs.forEach((blog, index) => {
          if (blog.image === save.image) {
            blogs.splice(index, 1);
          }
        });
        localStorage.setItem("blogs", JSON.stringify(blogs));
        setFlag(false);
        console.log("Blog is already saved");
      } else {
        blogs.unshift(save);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        setFlag(true);
      }
    } else {
      blogs.unshift(save);
      localStorage.setItem("blogs", JSON.stringify(blogs));
      setFlag(true);
    }
  };
  const deleteProjectById = (id) => {
    if (window.confirm("Are you sure ?")) {
      props.deleteProject(id);
      props.history.push("/");
    }
  };
  if (project) {
    return (
      <Fragment>
        {project ? (
          <NoSSR>
            <MetaTags
              title={project.title}
              description={project.title}
              authorName={project.authorName}
              image={project.image}
              url={window.location.href}
            />
          </NoSSR>
        ) : null}
        <nav className="transparent z-depth-0">
          <div className="nav-wrapper container">
            <div className="col s12">
              <Link to="/" className="breadcrumb grey-text text-darken-2">
                Dashboard
              </Link>
              <a href="#" className="breadcrumb blue-text text-darken-2">
                Blog Detail
              </a>
            </div>
          </div>
        </nav>
        <div
          style={{ padding: "0" }}
          className="container section project-details"
        >
          <div className="card z-depth-1">
            <div className="custom-action-btn pad-2">
              {auth.uid === project.authorId ? (
                <Fragment>
                  <Link to={`/projectUpdate/${id}`}>
                    <i class="material-icons">create</i>
                  </Link>
                  <a
                    href="#"
                    className="red-text"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteProjectById(id);
                    }}
                  >
                    <i class="material-icons">delete</i>
                  </a>
                </Fragment>
              ) : (
                ""
              )}
              <a onClick={handleSave} href="#!" class="secondary-content">
                {flag ? (
                  <i class="material-icons">grade</i>
                ) : (
                  <i class="material-icons">star_outline</i>
                )}
              </a>
            </div>
            <div className="devider"></div>
            <div className="card-content">
              <span class="new badge" data-badge-caption=" ">
                {project.category}
              </span>
              <span className="card-title">{project.title}</span>
              <img src={project.image} alt="Display Image" className="avatar" />
              <p>{renderHTML(project.content)}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div className="row valign-wrapper">
                <div class="col s2">
                  <img
                    src={project.authorImage}
                    alt="Author Image"
                    class="circle responsive-img"
                  />
                </div>
                <div className="col s10">
                  <p>Posted by {project.authorName}</p>
                  <p className="grey-text">
                    {moment(project.createAt.toDate()).calendar()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card p-5 grey lighten-2">
            <Comments project={project} id={id} />
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div className="container center custom-align-spinner">
        <div class="preloader-wrapper active">
          <div class="spinner-layer spinner-teal-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (id) => dispatch(deleteProject(id)),
  };
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
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "projects" }])
)(ProjectDetails);
