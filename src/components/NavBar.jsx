import React, { Component } from "react";
import { connect } from "react-redux";
import { onAuthorTyped } from "../actions/photosActions";
import _ from "lodash";

class NavBar extends Component {
  getDataList = () => {
    let authors = [];
    this.props.photos.map(photo => authors.push(photo.author));
    authors = _.uniq(authors);

    return (
      <datalist id="authors datalist">
        {authors.map(author => (
          <option key={author} value={author} />
        ))}
      </datalist>
    );
  };

  render() {
    return (
      <nav>
        {this.getDataList()}
        <i className="fa fa-search" aria-hidden="true" />
        <input
          className="input-author"
          type="text"
          placeholder="author..."
          list="authors datalist"
          onChange={e => this.props.onAuthorTyped(e.currentTarget.value)}
        />
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photos.filteredPhotos
});

export default connect(
  mapStateToProps,
  { onAuthorTyped }
)(NavBar);
