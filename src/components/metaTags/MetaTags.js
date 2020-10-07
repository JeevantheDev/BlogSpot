import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

const metaDecorator = require("./MetaHost");
const MetaTags = ({ title, description, authorName, url, image }) => {
  return (
    <Fragment>
      <Helmet>
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
        <title>{`${title}-Blog Spot`}</title>
      </Helmet>
    </Fragment>
  );
};

export default MetaTags;
