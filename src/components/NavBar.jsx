import React, { Component } from "react";
import { connect } from "react-redux";
import { onAuthorTyped } from "../actions/photosActions";

class NavBar extends Component {
  render() {
    return (
      <nav>
        <i className="fa fa-search" aria-hidden="true" />
        <input
          className="input-author"
          type="text"
          placeholder="author..."
          onChange={e => this.props.onAuthorTyped(e.currentTarget.value)}
        />
      </nav>
    );
  }
}

export default connect(
  null,
  { onAuthorTyped }
)(NavBar);
