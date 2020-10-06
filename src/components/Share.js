import React from "react";

const Share = ({ title }) => {
  const shareButton = (e) => {
    e.preventDefault();

    console.log(window.navigator);
    if (navigator.share) {
      navigator
        .share({
          url: `${title}`,
        })
        .then(() => {
          console.log("Success");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Error");
    }
  };
  return (
    <div>
      <button onClick={shareButton}>Share</button>
    </div>
  );
};

export default Share;
