import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPhotos } from "./../actions/photosActions";

class SelectedPhoto extends Component {
  state = {
    photoNotFound: false
  };

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
          src={`https://picsum.photos/${selectedPhoto.width /
            3}/${selectedPhoto.height / 3}?image=${id}`}
          alt={selectedPhoto.post_url}
        />
      );
    else {
      const photo = photos ? photos.find(photo => photo.id === id) : null;
      return (
        <React.Fragment>
          {photo ? (
            <img
              src={`https://picsum.photos/${photo.width / 3}/${photo.height /
                3}?image=${id}`}
              alt={photo.post_url}
            />
          ) : null}
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div className="selected-photo">
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
        {this.getPhoto()}
      </div>
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
