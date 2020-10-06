import React, { Fragment } from "react";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
const CommentItems = (props) => {
  const { comments } = props;
  if (comments) {
    return (
      <Fragment>
        {comments &&
          comments.map((comment) => {
            return (
              <div className="col s12 m4">
                <div className="card-panel teal darken-1 z-depth-0">
                  <Box component="fieldset" borderColor="transparent">
                    <Rating
                      name="disabled"
                      value={comment.rating}
                      precision={0.5}
                      disabled
                      size="large"
                    />
                  </Box>
                  <div className="row valign-wrapper">
                    <div class="col s2">
                      <a href="#" className="btn btn-floating pink lighten-1">
                        <img
                          className="avatar"
                          src={comment.authorImage}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col s10">
                      <p className="orange-text">By {comment.authorName}</p>
                      <p className="white-text">
                        {moment(comment.createAt.toDate()).calendar()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Fragment>
    );
  } else {
    return <p>Loading</p>;
  }
};

export default CommentItems;
