import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchPhotos,
  onPhotoSelected,
  setCurrentPage
} from "./../actions/photosActions";

import NavBar from "./NavBar";
import Image from "./common/Image";
import Pagination from "./common/Pagination";

class Gallery extends Component {
  componentWillMount() {
    if (this.props.currentPage !== this.getPage())
      this.props.setCurrentPage(this.getPage());
  }

  componentDidMount() {
    if (!this.props.allPhotos.length) this.props.fetchPhotos();
  }

  getPage = () => Number(this.props.match.params.number);

  getPhotosOnPage = () => {
    const page = this.getPage();
    const start = this.props.pageSize * (page - 1);
    const end = this.props.pageSize * page;
    return this.props.photos.slice(start, end);
  };

  render() {
    const photosOnPage = this.getPhotosOnPage();
    return (
      <div className="container">
        <NavBar />
        <div className="gallery">
          {photosOnPage.map(photo => (
            <div key={photo.id} className="photo">
              <Link to={`/photo/${photo.id}`}>
                <div
                  className="zoom-icon-div"
                  onClick={() => this.props.onPhotoSelected(photo)}
                >
                  <i className="fa fa-search-plus" aria-hidden="true" />
                </div>

                <Image
                  width="300"
                  height="300"
                  id={photo.id}
                  alt={photo.post_url}
                />
              </Link>
              <p key={photo.id} className="photo-author">
                {photo.author}
              </p>
            </div>
          ))}
        </div>
        <Pagination history={this.props.history} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photos.filteredPhotos,
  allPhotos: state.photos.filteredPhotos,
  pageSize: state.photos.pageSize,
  currentPage: state.photos.currentPage
});

export default connect(
  mapStateToProps,
  { fetchPhotos, onPhotoSelected, setCurrentPage }
)(Gallery);
