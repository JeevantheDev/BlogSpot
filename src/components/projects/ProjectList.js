import React, { Fragment } from "react";
import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const ProjectList = ({ projects, auth }) => {
  const state = {
    data: [],
    filterList: [],
  };
  const [list, setList] = useState(state);
  const [isaverage, setIsAverage] = useState(false);
  const [rate, setRate] = useState("");
  useEffect(() => {
    if (projects) {
      setList({
        data: projects,
        filterList: projects,
      });
    }
  }, [projects]);
  const filterList = (e) => {
    e.preventDefault();
    if (e.target.value !== "All") {
      if (isaverage) {
        sortListByFilter(e, rate);
      } else {
        const updateList = list.data.filter((project) => {
          return (
            project.category.toLowerCase() === e.target.value.toLowerCase()
          );
        });
        setList({
          data: projects,
          filterList: [...updateList],
        });
      }
    } else {
      setList({
        data: projects,
        filterList: projects,
      });
    }
  };
  const sortListByFilter = (e, newValue) => {
    e.preventDefault();
    if (e.target.value !== "All") {
      const updateList = list.data.filter((project) => {
        const set = new Set();
        project.ratings.map((rating) => {
          set.add(rating.rating);
        });
        let sum = 0;
        set.forEach((val) => {
          sum += val;
        });
        const avg = sum / set.size;
        return (
          avg >= newValue &&
          project.category.toLowerCase() === e.target.value.toLowerCase()
        );
      });
      setList({
        data: projects,
        filterList: [...updateList],
      });
    } else {
      setList({
        data: projects,
        filterList: projects,
      });
    }
  };
  const sortList = (e) => {
    e.preventDefault();
    if (e.target.value !== "All") {
      const updateList = list.data.filter((project) => {
        const set = new Set();
        project.ratings.map((rating) => {
          set.add(rating.rating);
        });
        let sum = 0;
        set.forEach((val) => {
          sum += val;
        });
        const avg = sum / set.size;
        if (e.target.value.length === 1) {
          setRate(parseInt(e.target.value));
        }
        return avg >= e.target.value;
      });
      setList({
        data: projects,
        filterList: [...updateList],
      });
    } else {
      setList({
        data: projects,
        filterList: projects,
      });
    }
    setIsAverage(!isaverage);
  };
  return (
    <div className="project-list section">
      <span className="flow-text ">
        All <span className="teal-text">Activity</span>
      </span>
      <div className="devider"></div>
      <div className="section sticky">
        <div style={{ marginBottom: "0" }} className="row">
          <div className="col s6">
            <select onChange={filterList} class="browser-default">
              <option value="" disabled selected>
                Filter by Category
              </option>
              <option value="All">All</option>
              <option value="Travelling">Travelling</option>
              <option value="Cooking">Cooking</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Technology">Technology</option>
              <option value="Development">Development</option>
            </select>
          </div>
          <div className="col s6">
            <select onChange={sortList} class="browser-default">
              <option value="" disabled selected>
                Sort by Rating
              </option>
              <option value="All">All</option>
              <option value="4">⭐⭐⭐⭐ & Up</option>
              <option value="3">⭐⭐⭐ & Up</option>
              <option value="2">⭐⭐ & Up</option>
            </select>
          </div>
        </div>
      </div>
      {projects ? (
        <Fragment>
          {list.filterList.length > 0 ? (
            <Fragment>
              {list.filterList.map((project) => {
                return (
                  <Link
                    to={`/projects/${project.id}/${project.slug}`}
                    key={project.id}
                  >
                    <ProjectSummary authId={auth.uid} project={project} />{" "}
                  </Link>
                );
              })}
            </Fragment>
          ) : (
            <Fragment>
              <div className="card z-depth-1 blue-grey darken-1">
                <div className="card-content">
                  <span className="card-title white-text">
                    Sorry, no blogs found..
                  </span>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      ) : (
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
      )}
    </div>
  );
};

export default ProjectList;
