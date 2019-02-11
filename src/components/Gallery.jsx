import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchPhotos,
  onPhotoSelected,
  setCurrentPage
} from "./../actions/photosActions";

import NavBar from "./NavBar";
import Pagination from "./Pagination";
import "../styles/Gallery.css";
import GalleryImage from "./GalleryImage";
import Footer from "./Footer";

class Gallery extends Component {
  componentWillMount() {
    if (this.props.currentPage !== this.getPage())
      this.props.setCurrentPage(this.getPage());
  }

  async componentDidMount() {
    if (!this.props.allPhotos.length) await this.props.fetchPhotos();
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
        <NavBar history={this.props.history} />
        <div className="gallery">
          {photosOnPage.map(photo => (
            <GalleryImage
              key={photo.id}
              photo={photo}
              width="300"
              height="300"
            />
          ))}
        </div>
        <Pagination history={this.props.history} />
        <Footer />
      </div>
    );
  }
}

//----------- Redux -------------
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
