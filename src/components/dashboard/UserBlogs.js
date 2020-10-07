import React, { Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { deleteProject } from "../../store/actions/projectActions";
import { connect } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "../pagination/Pagination";

const UserBlogs = (props) => {
  const { project, auth } = props;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(4);
  const filterData = [];
  useEffect(() => {
    if (project) {
      project.filter((blog) => {
        if (blog.authorId === auth.uid) {
          filterData.unshift(blog);
        }
      });
      setData(filterData);
    }
  }, [project]);
  const indexLast = currentPage * dataPerPage;
  const indexFast = indexLast - dataPerPage;
  const currentData = data.slice(indexFast, indexLast);

  const paginate = (number) => setCurrentPage(number);

  const deleteProjectById = (id) => {
    if (window.confirm("Are you sure ?")) {
      props.deleteProject(id);
    }
  };
  if (project) {
    return (
      <Fragment>
        {currentData.length > 0 ? (
          <Fragment>
            {currentData.map((project) => {
              return (
                <Link
                  to={`/projects/${project.id}/${project.slug}`}
                  key={project.id}
                >
                  <div className="card z-depth-1 project-summary teal darken-1">
                    <div className="card-content white-text">
                      <span class="new badge z-depth-1" data-badge-caption=" ">
                        {project.category}
                      </span>
                      <span className="card-title">{project.title}</span>
                      <div style={{ marginBottom: "0" }} className="row">
                        <div class="col s2">
                          <a
                            href="#"
                            className="btn btn-floating pink lighten-1"
                          >
                            <img
                              className="avatar"
                              src={project.authorImage}
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="col s10">
                          <p className="orange-text">
                            Posted by {project.authorName}
                          </p>
                          <p className="white-text">
                            {moment(project.createAt.toDate()).calendar()}
                          </p>
                        </div>
                      </div>
                    </div>
                    {auth.uid === project.authorId ? (
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
                </Link>
              );
            })}
          </Fragment>
        ) : (
          <Fragment>
            <div className="card-panel teal">
              <span className="card-title white-text">No Blogs yet.</span>
            </div>
          </Fragment>
        )}
        {data.length > 4 ? (
          <Pagination
            dataPerPage={dataPerPage}
            totalData={data.length}
            paginate={paginate}
            page={currentPage}
          />
        ) : null}
      </Fragment>
    );
  } else {
    return (
      <div class="preloader-wrapper active custom-align-spinner-2">
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
    );
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (id) => dispatch(deleteProject(id)),
  };
};
export default connect(null, mapDispatchToProps)(UserBlogs);
