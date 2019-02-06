import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPhotos } from "./../actions/photosActions";

class Gallery extends Component {
  componentDidMount() {
    console.log("props: ", this.props);
    this.props.fetchPhotos();
  }

  render() {
    console.log("props: ", this.props);
    return (
      <div className="gallery">
        {this.props.photos.map(photo => (
          <div key={photo.id} className="photo">
            <img
              src={`https://picsum.photos/300/300?image=${photo.id}`}
              alt={photo.post_url}
            />
            <p key={photo.id} className="photo-author">
              {photo.author}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photos.photos
});

export default connect(
  mapStateToProps,
  { fetchPhotos }
)(Gallery);
