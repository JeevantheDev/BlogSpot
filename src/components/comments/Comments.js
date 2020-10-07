import React, { Fragment, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { updateProject } from "../../store/actions/projectActions";
import { setAlert } from "../../store/actions/alertAction";
import "./Comment.css";
import { useEffect } from "react";
import CommentItems from "./CommentItems";
const Comments = (props) => {
  const { auth, id, project, profile } = props;
  const state = {
    authorId: "",
    authorImage: "",
    authorName: "",
    category: "",
    content: "",
    createAt: "",
    image: "",
    ratings: [],
    title: "",
    slug: "",
  };
  const stateUser = {
    id: "",
    authorName: "",
    authorImage: "",
    createAt: "",
    rating: "",
  };
  const [star, setStar] = useState(0);
  const [user, setUser] = useState(stateUser);
  const [data, setData] = useState(state);
  const [flag, setFlag] = useState(true);
  const [check, setCheck] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [change, setChange] = useState(true);
  useEffect(() => {
    if (project) {
      setRatings(project.ratings);
    }
  }, [project]);
  useEffect(() => {
    if (project) {
      setData({
        authorId: project.authorId,
        authorImage: project.authorImage,
        authorName: project.authorName,
        category: project.category,
        content: project.content,
        createAt: project.createAt,
        image: project.image,
        ratings: project.ratings,
        title: project.title,
        slug: project.slug,
      });
    }
  }, [project]);
  useEffect(() => {
    if (project && auth) {
      project.ratings.filter((rating) => {
        if (rating.id === auth.uid) {
          setFlag(false);
          setCheck(false);
          setStar(rating.rating);
        }
      });
    }
  }, [project]);
  useEffect(() => {
    if (star) {
      setUser({
        id: auth.uid,
        authorName: profile.name,
        authorImage: profile.avatar,
        createAt: new Date(),
        rating: star,
      });
    }
  }, [star]);
  useEffect(() => {
    if (user.id !== "") {
      setData({
        ...data,
        ratings: [].concat(...data.ratings, user),
      });
    }
  }, [user]);
  const [currentPage] = useState(1);
  const [ratingsPerPage, setRatingsPerPage] = useState(6);

  const indexLast = currentPage * ratingsPerPage;
  const indexFast = indexLast - ratingsPerPage;
  const currentRatings = ratings.slice(indexFast, indexLast);
  const loadAll = (length) => {
    setRatingsPerPage(length);
    setChange(!change);
  };
  const changeRating = (e, value) => {
    setStar(value);
    setCheck(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (check === false) {
      props.updateProject(data, id);
      setFlag(false);
    } else {
      props.setAlert("Please give the rating.", "error");
    }
  };
  return (
    <Fragment>
      {auth.uid ? (
        <div className="rate">
          <span className="teal-text custom-font">
            {flag ? "Give your Rating: " : "Your Rating: "}
          </span>
          <Box component="fieldset" borderColor="transparent">
            {flag && check ? (
              <Rating
                name="simple-controlled"
                value={star}
                precision={0.5}
                onChange={changeRating}
              />
            ) : (
              <Rating name="disabled" value={star} precision={0.5} disabled />
            )}
          </Box>
          {flag ? (
            <a
              onClick={handleSubmit}
              class="waves-effect waves-light btn green"
            >
              <i class="material-icons">add</i>
            </a>
          ) : null}
        </div>
      ) : null}
      <div className="card-action">
        <div className="row">
          <CommentItems comments={currentRatings} />
        </div>
      </div>
      {change ? (
        <Fragment>
          {project.ratings.length > 6 ? (
            <a
              onClick={(e) => {
                e.preventDefault();
                loadAll(project.ratings.length);
              }}
              class="waves-effect waves-teal btn-flat custom-align black-text"
            >
              Load All <i class="large material-icons">arrow_drop_down</i>
            </a>
          ) : null}
        </Fragment>
      ) : (
        <a
          onClick={(e) => {
            e.preventDefault();
            loadAll(6);
          }}
          class="waves-effect waves-teal btn-flat custom-align black-text"
        >
          Hide All <i class="large material-icons">arrow_drop_up</i>
        </a>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProject: (project, id) => dispatch(updateProject(project, id)),
    setAlert: (msg, type) => dispatch(setAlert(msg, type)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "comments", orderBy: ["createAt", "desc"] }])
)(Comments);
