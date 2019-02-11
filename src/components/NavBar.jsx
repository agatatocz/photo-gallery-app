import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  onAuthorTyped,
  setCurrentPage,
  setPageSize
} from "../actions/photosActions";
import "../styles/NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.pageSizeSelect = React.createRef();
  }

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

  async componentWillReceiveProps() {
    await this.props.setCurrentPage(1);
    this.props.history.push(`/page/1`);
  }

  handleAuthorChange = e => {
    this.props.onAuthorTyped(e.currentTarget.value);
    this.props.setPageSize(this.pageSizeSelect.current.value);
  };

  render() {
    return (
      <nav className="filter-nav-bar">
        {this.getDataList()}
        <i className="fa fa-search" aria-hidden="true" />
        <input
          className="input-author"
          type="text"
          placeholder="author..."
          list="authors datalist"
          defaultValue={this.props.author}
          onChange={e => this.handleAuthorChange(e)}
        />
        <div className="page-size-select">
          <span>view </span>
          <select
            ref={this.pageSizeSelect}
            onChange={e => this.props.setPageSize(e.currentTarget.value)}
          >
            {this.props.options.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photos.filteredPhotos,
  author: state.photos.author,
  pageSize: state.photos.pageSize,
  options: state.photos.pageSizeOptions
});

export default connect(
  mapStateToProps,
  { onAuthorTyped, setCurrentPage, setPageSize }
)(NavBar);
