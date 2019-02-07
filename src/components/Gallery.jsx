import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPhotos, onPhotoSelected } from "./../actions/photosActions";

import NavBar from "./NavBar";

class Gallery extends Component {
  componentDidMount() {
    if (!this.props.allPhotos.length) this.props.fetchPhotos();
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <div className="gallery">
          {this.props.photos.map(photo => (
            <div key={photo.id} className="photo">
              <Link to={`/photo/${photo.id}`}>
                <div className="zoom-icon-div">
                  <i className="fa fa-search-plus" aria-hidden="true" />
                </div>
                <img
                  src={`https://picsum.photos/300/300?image=${photo.id}`}
                  alt={photo.post_url}
                  onClick={() => this.props.onPhotoSelected(photo)}
                />
              </Link>
              <p key={photo.id} className="photo-author">
                {photo.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photos.filteredPhotos,
  allPhotos: state.photos.filteredPhotos
});

export default connect(
  mapStateToProps,
  { fetchPhotos, onPhotoSelected }
)(Gallery);
