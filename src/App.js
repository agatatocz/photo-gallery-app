import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./styles/App.css";
import Gallery from "./components/Gallery";
import SelectedPhoto from "./components/SelectedPhoto";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/photo/:id" component={SelectedPhoto} />
        <Route path="/" component={Gallery} />
      </Switch>
    );
  }
}

export default App;
