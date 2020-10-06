import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

const Search = ({ projects }) => {
  const state = {
    sourcedata: [],
    filterData: [],
  };
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(state);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    if (searchValue === "") {
      setFlag(false);
    }
  }, []);
  useEffect(() => {
    if (projects) {
      setData({
        sourcedata: projects,
        filterData: projects,
      });
    }
  }, [projects]);
  const filterList = (e) => {
    e.preventDefault();
    const updateList = data.sourcedata.filter((item) => {
      return (
        item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    setData({
      sourcedata: projects,
      filterData: updateList,
    });
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      setFlag(true);
    } else {
      setFlag(false);
    }
  };
  return (
    <Fragment>
      <li style={{ width: "100%" }}>
        <div class="input-field col s12">
          <i class="material-icons prefix teal-text darken-3">search</i>
          <input
            placeholder="Search Blogs.."
            id="value"
            onChange={filterList}
            type="text"
            class="validate grey-text"
          />
          {flag ? (
            <ul class="collection with-header white-text float-none search-results z-depth-1">
              {data.filterData.length > 0 ? (
                <Fragment>
                  {data.filterData.map((item) => {
                    return (
                      <li class="collection-item blue-grey">
                        <Link to={`/projects/${item.id}/${item.slug}`}>
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </Fragment>
              ) : (
                <li className="collection-item blue-grey white-text">
                  No Blogs Found..
                </li>
              )}
            </ul>
          ) : null}
        </div>
      </li>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "projects" }])
)(Search);
