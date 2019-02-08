import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import KeyboardEventHandler from "react-keyboard-event-handler";
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
          ${selectedPhoto.width}/
          ${selectedPhoto.height}
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
              ${photo.width}/
              ${photo.height}
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

  handleKey = key => {
    const id = Number(this.props.match.params.id);

    switch (key) {
      case "left":
        const prevId = this.getPrevId(id);
        if (prevId) this.props.history.push(`/photo/${prevId}`);
        break;

      case "right":
        const nextId = this.getNextId(id);
        if (nextId) this.props.history.push(`/photo/${nextId}`);
        break;

      default:
        return;
    }
  };

  render() {
    const id = Number(this.props.match.params.id);
    const nextId = this.getNextId(id);
    const prevId = this.getPrevId(id);
    return (
      <React.Fragment>
        <KeyboardEventHandler
          handleKeys={["left", "right"]}
          onKeyEvent={key => this.handleKey(key)}
        />

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
