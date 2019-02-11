import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { onPhotoSelected } from "./../actions/photosActions";
import Image from "./common/Image";
import "../styles/GalleryImage.css";

const GalleryImage = props => {
  const { photo } = props;
  let loadingIcon = React.createRef();
  let author = React.createRef();
  const inlineStyle = {
    width: `${props.width}px`,
    height: `${props.height}px`
  };

  const onLoad = () => {
    loadingIcon.current.style.zIndex = "-1";
    author.current.style.opacity = "1";
  };

  return (
    <div className="photo-div">
      <div style={inlineStyle}>
        <Link to={`/photo/${photo.id}`}>
          <div
            style={inlineStyle}
            className="zoom-icon-div"
            onClick={() => props.onPhotoSelected(photo)}
          >
            <i className="fa fa-search-plus" aria-hidden="true" />
          </div>

          <Image
            width={props.width}
            height={props.height}
            id={photo.id}
            alt={photo.post_url}
            onLoad={onLoad}
          />

          <div className="load-icon-div" ref={loadingIcon} style={inlineStyle}>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
          </div>
        </Link>
      </div>
      <a href={photo.author_url} target="_blank" rel="noopener noreferrer">
        <p ref={author} className="photo-author">
          {photo.author}
        </p>
      </a>
    </div>
  );
};

export default connect(
  null,
  { onPhotoSelected }
)(GalleryImage);
