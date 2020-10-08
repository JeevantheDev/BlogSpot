import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useState } from "react";
import firebase from "../../config/fbConfig";

const metaDecorator = require("./MetaHost");
const MetaTags = ({ title, description, authorName, url, image }) => {
  const [urlLink, setUrlLink] = useState("");
  const storage = firebase.storage();
  let temp;
  if (image) {
    temp = image
      .toString()
      .split(/https.*?%2F/)
      .join("");
    temp = temp.split(/\?/)[0];
  }
  const path = storage.ref().child(`images/${temp}`);
  // console.log(path);

  useEffect(() => {
    import("../../img/network.svg").then((link) => {
      setUrlLink(link.default);
    });
  }, []);
  // console.log(urlLink);
  return (
    <Fragment>
      <Helmet>
        <title>{`${title}-Blog Spot`}</title>
        <meta property="description" content={title} />
        <meta property="title" content={title} />
        <meta property="author" content={authorName} />
        <meta property="og:site_name" content="Blog Spot" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={
            metaDecorator.hostname +
            window.location.pathname +
            window.location.search
          }
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta name="twitter:image:src" property="og:image" content={image} />
        <meta name="twitter:card" property="og:image" content="display_image" />
      </Helmet>
    </Fragment>
  );
};

export default MetaTags;
