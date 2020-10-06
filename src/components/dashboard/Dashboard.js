import React, { Component, Fragment } from "react";
import Favourite from "./Favourite";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Offline from "../layout/Offline";
import { Redirect } from "react-router-dom";
import UserBlogs from "./UserBlogs";

class Dashboard extends Component {
  state = {
    favourites: [],
  };
  getBlogs = () => {
    let data;
    if (localStorage.getItem("blogs") === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem("blogs"));
    }
    return data;
  };
  componentDidMount() {
    const blogs = this.getBlogs();
    this.setState({
      favourites: blogs,
    });
  }
  render() {
    const { projects, auth } = this.props;
    let isNetwork;
    if (navigator.onLine) {
      isNetwork = true;
    } else {
      isNetwork = false;
    }
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <Favourite favourites={this.state.favourites} />
            <div className="devider"></div>
            {isNetwork ? (
              <div style={{ marginTop: "1.5rem" }}>
                <span className="flow-text">Your Blogs</span>
                {auth.uid ? (
                  <UserBlogs auth={auth} project={projects} />
                ) : (
                  <div className="card z-depth-1 teal">
                    <div className="card-content">
                      <span className="card-title white-text">
                        Sorry, you have not login yet..
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
          {isNetwork ? (
            <div className="col s12 m6">
              <ProjectList auth={auth} projects={projects} />
            </div>
          ) : (
            <Offline />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "projects", orderBy: ["createAt", "desc"] }])
)(Dashboard);
