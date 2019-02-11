import React from "react";

const Image = ({ width, height, id, alt = `Photo #${id}`, ...rest }) => {
  return (
    <React.Fragment>
      <img
        src={`https://picsum.photos/
        ${width}/
        ${height}
        ?image=${id}`}
        alt={alt}
        {...rest}
      />
    </React.Fragment>
  );
};

export default Image;
