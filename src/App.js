import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import Gallery from "./components/Gallery";
import SelectedPhoto from "./components/SelectedPhoto";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/photo/:id" component={SelectedPhoto} />
          <Route path="/" component={Gallery} />
        </Switch>
      </div>
    );
  }
}

export default App;
