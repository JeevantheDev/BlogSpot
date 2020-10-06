import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";
import renderHTML from "react-render-html";
import { useState } from "react";
import { useEffect } from "react";
import Offline from "../layout/Offline";
const SavedDetails = (props) => {
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
    getBlogs();
  });
  useEffect(() => {
    if (id) {
      const blogs = getBlogs();
      blogs.filter((blog) => {
        if (blog.id === id) {
          const copy = initState(blog, id);
          setSave(copy[0]);
        }
      });
    }
  }, []);
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
  let isNetwork;
  if (navigator.onLine) {
    isNetwork = true;
  } else {
    isNetwork = false;
  }
  if (save.length !== 0) {
    return (
      <div className="container section project-details">
        <nav>
          <div className="nav-wrapper blue-grey lighten-4">
            <div className="col s12">
              <Link to="/" className="breadcrumb blue-text text-darken-2">
                Dashboard
              </Link>
              <a href="#" className="breadcrumb blue-text text-darken-2">
                Blog Detail
              </a>
            </div>
          </div>
        </nav>
        <div className="card z-depth-1">
          <div className="card-content">
            <div className="custom-action-btn">
              <a onClick={handleSave} href="#!" class="secondary-content">
                {flag ? (
                  <i class="material-icons">grade</i>
                ) : (
                  <i class="material-icons">star_outline</i>
                )}
              </a>
            </div>
            <span class="new badge" data-badge-caption=" ">
              {save.category}
            </span>
            <span className="card-title">{save.title}</span>
            {isNetwork ? (
              <img src={save.image} alt="Display Image" className="avatar" />
            ) : (
              <div className="card blue-grey">
                <div className="card-content">
                  <p className="white-text custom-align">
                    Sorry you are offline so image is not available
                  </p>
                </div>
              </div>
            )}
            <p>{renderHTML(save.content)}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div className="row valign-wrapper">
              <div class="col s2">
                {isNetwork ? (
                  <img
                    src={save.authorImage}
                    alt="Author Image"
                    class="circle responsive-img"
                  />
                ) : null}
              </div>
              <div className="col s10">
                <p>Posted by {save.authorName}</p>
                <p className="grey-text">
                  {moment(save.createAt.toDate).format("LL")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading... Project...</p>
      </div>
    );
  }
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
)(SavedDetails);
