import React from "react";

const Image = ({ width, height, id, alt = `Photo #${id}`, ...rest }) => {
  return (
    <img
      src={`https://picsum.photos/
          ${width}/
          ${height}
          ?image=${id}`}
      alt={alt}
      {...rest}
    />
  );
};

export default Image;
