import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { setCurrentPage } from "../actions/photosActions";

class Pagination extends Component {
  //returns array of page numbers, e.g. [1, 2, 3, ... n]
  getPages = () => {
    const { count, pageSize } = this.props;
    const numberOfPages = Math.ceil(count / pageSize);
    return _.range(1, numberOfPages + 1);
  };

  styleActivePage = () => {
    const lis = [...document.querySelectorAll(".pagination ul li")];
    lis.forEach(li => li.setAttribute("class", ""));
    lis[this.props.currentPage].setAttribute("class", "active");
  };

  handlePrev = () => {
    const prevPage =
      this.props.currentPage - 1 > 0 ? this.props.currentPage - 1 : 1;
    this.changePage(prevPage);
  };

  handleNext = () => {
    const max = this.getPages().length;
    const nextPage =
      this.props.currentPage + 1 < max ? this.props.currentPage + 1 : max;
    this.changePage(nextPage);
  };

  changePage = async page => {
    this.props.history.push(`/page/${page}`);
    await this.props.setCurrentPage(page);
    this.styleActivePage();
  };

  render() {
    const pages = this.getPages();
    if (pages.length && !pages.includes(this.props.currentPage))
      return <Redirect to="/pageNotFound" />;
    return (
      <div className="pagination">
        <ul>
          <li onClick={this.handlePrev}>
            <i className="fa fa-arrow-left" aria-hidden="true" />
          </li>
          {pages.map(page => (
            <li key={page} onClick={() => this.changePage(page)}>
              {page}
            </li>
          ))}
          <li onClick={this.handleNext}>
            <i className="fa fa-arrow-right" aria-hidden="true" />
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.photos.filteredPhotos.length,
  pageSize: state.photos.pageSize,
  currentPage: state.photos.currentPage
});

export default connect(
  mapStateToProps,
  { setCurrentPage }
)(Pagination);
