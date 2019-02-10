import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./styles/App.css";
import Gallery from "./components/Gallery";
import SelectedPhoto from "./components/SelectedPhoto";
import PageNotFound from "./components/PageNotFound";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/photo/:id" component={SelectedPhoto} />
        <Route path="/page/:number" component={Gallery} />
        <Route path="/pageNotFound" component={PageNotFound} />
        <Route path="/" render={() => <Redirect to="/page/1" />} />
      </Switch>
    );
  }
}

export default App;
