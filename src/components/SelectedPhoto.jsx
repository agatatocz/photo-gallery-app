import React, { Component } from "react";
import { connect } from "react-redux";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Redirect } from "react-router-dom";

import { fetchPhotos } from "./../actions/photosActions";
import LinkIcon from "./common/LinkIcon";
import Image from "./common/Image";
import "../styles/SelectedPhoto.css";

class SelectedPhoto extends Component {
  componentDidMount() {
    if (!this.props.photos.length) {
      this.props.fetchPhotos();
    }
  }

  getPhoto = () => {
    const id = this.getId();
    const { photos, selectedPhoto } = this.props;
    if (selectedPhoto && id === selectedPhoto.id)
      return (
        <Image
          width={selectedPhoto.width}
          height={selectedPhoto.height}
          id={id}
          alt={selectedPhoto.post_url}
        />
      );
    else {
      const photo = photos ? photos.find(photo => photo.id === id) : null;
      if (photo)
        return (
          <Image
            width={photo.width}
            height={photo.height}
            id={id}
            alt={photo.post_url}
          />
        );

      return !!photos.length ? <Redirect to="/pageNotFound" /> : null;
    }
  };

  getId = () => Number(this.props.match.params.id);

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
    const id = this.getId();

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
    const id = this.getId();
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
            <LinkIcon
              path={`/page/${this.props.currentPage}`}
              className="fa fa-long-arrow-left"
            />

            {prevId ? (
              <LinkIcon
                path={`/photo/${prevId}`}
                className="fa fa-angle-left"
              />
            ) : (
              <i />
            )}
          </div>

          <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
          {this.getPhoto()}

          {nextId ? (
            <LinkIcon path={`/photo/${nextId}`} className="fa fa-angle-right" />
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
  selectedPhoto: state.photos.selectedPhoto,
  currentPage: state.photos.currentPage
});

export default connect(
  mapStateToProps,
  { fetchPhotos }
)(SelectedPhoto);
