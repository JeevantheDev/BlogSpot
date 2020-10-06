import React, { Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { deleteProject } from "../../store/actions/projectActions";
import { connect } from "react-redux";

const ProjectSummary = (props) => {
  const { project, authId } = props;
  const deleteProjectById = (id) => {
    if (window.confirm("Are you sure ?")) {
      props.deleteProject(id);
    }
  };
  return (
    <div className="card z-depth-1 project-summary blue-grey darken-1">
      <div className="card-content white-text">
        <span class="new badge z-depth-1" data-badge-caption=" ">
          {project.category}
        </span>
        <span className="card-title">{project.title}</span>
        <div style={{ marginBottom: "0" }} className="row">
          <div class="col s2">
            <a href="#" className="btn btn-floating pink lighten-1">
              <img className="avatar" src={project.authorImage} alt="" />
            </a>
          </div>
          <div className="col s10">
            <p className="orange-text">Posted by {project.authorName}</p>
            <p className="white-text">
              {moment(project.createAt.toDate()).calendar()}
            </p>
          </div>
        </div>
      </div>
      {authId === project.authorId ? (
        <div className="card-action">
          <Link
            className="yellow-text"
            to={`/projectUpdate/${project.id}/${project.slug}`}
          >
            <i class="material-icons">create</i>
          </Link>{" "}
          <a
            className="red-text"
            onClick={(e) => {
              e.preventDefault();
              deleteProjectById(project.id);
            }}
          >
            <i class="material-icons">delete</i>
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (id) => dispatch(deleteProject(id)),
  };
};
export default connect(null, mapDispatchToProps)(ProjectSummary);
