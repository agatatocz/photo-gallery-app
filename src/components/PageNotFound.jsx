import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { onAuthorTyped } from "../actions/photosActions";
import "../styles/PageNotFound.css";

const PageNotFound = ({ currentPage, onAuthorTyped }) => {
  return (
    <div className="container">
      <h2>Page not found.</h2>
      <h4>Sorry, page with given URL doesn't exist.</h4>

      <Link to={`/page/${currentPage}`} onClick={() => onAuthorTyped("")}>
        <div className="to-gallery-div">
          <i className="fa fa-long-arrow-left" aria-hidden="true" />
          <p>Back to gallery</p>
        </div>
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  currentPage: state.photos.currentPage
});

export default connect(
  mapStateToProps,
  { onAuthorTyped }
)(PageNotFound);
