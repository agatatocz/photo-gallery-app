import React from "react";
import { Link } from "react-router-dom";

const LinkIcon = ({ path, className }) => {
  return (
    <Link to={path}>
      <i className={className} aria-hidden="true" />
    </Link>
  );
};

export default LinkIcon;
