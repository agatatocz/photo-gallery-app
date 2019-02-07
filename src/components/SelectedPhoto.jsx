import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPhotos } from "./../actions/photosActions";

class SelectedPhoto extends Component {
  componentDidMount() {
    if (!this.props.photos.length) {
      this.props.fetchPhotos();
    }
  }

  getPhoto = () => {
    const id = Number(this.props.match.params.id);
    const { photos, selectedPhoto } = this.props;
    if (selectedPhoto && id === selectedPhoto.id)
      return (
        <img
          src={`https://picsum.photos/
          ${parseInt(selectedPhoto.width / 3)}/
          ${parseInt(selectedPhoto.height / 3)}
          ?image=${id}`}
          alt={selectedPhoto.post_url}
        />
      );
    else {
      const photo = photos ? photos.find(photo => photo.id === id) : null;
      return (
        <React.Fragment>
          {photo ? (
            <img
              src={`https://picsum.photos/
              ${parseInt(photo.width / 3)}/
              ${parseInt(photo.height / 3)}
                ?image=${id}`}
              alt={photo.post_url}
            />
          ) : null}
        </React.Fragment>
      );
    }
  };

  getNextId = id => {
    const { photos } = this.props;
    try {
      const index = photos.findIndex(photo => photo.id === id);
      return photos[index + 1].id;
    } catch {
      return null;
    }
  };

  getPrevId = id => {
    const { photos } = this.props;
    try {
      const index = photos.findIndex(photo => photo.id === id);
      return photos[index - 1].id;
    } catch {
      return null;
    }
  };

  render() {
    const id = Number(this.props.match.params.id);
    const nextId = this.getNextId(id);
    const prevId = this.getPrevId(id);
    return (
      <React.Fragment>
        <div className="selected-photo">
          <div>
            <Link to="/">
              <i className="fa fa-long-arrow-left" aria-hidden="true" />
            </Link>
            {prevId ? (
              <Link to={`/photo/${prevId}`}>
                <i className="fa fa-angle-left" aria-hidden="true" />
              </Link>
            ) : (
              <i />
            )}
          </div>

          <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
          {this.getPhoto()}

          {nextId ? (
            <Link to={`/photo/${nextId}`}>
              <i className="fa fa-angle-right" aria-hidden="true" />
            </Link>
          ) : (
            <i />
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photos.allPhotos,
  selectedPhoto: state.photos.selectedPhoto
});

export default connect(
  mapStateToProps,
  { fetchPhotos }
)(SelectedPhoto);
