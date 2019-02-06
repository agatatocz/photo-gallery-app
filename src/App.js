import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import Gallery from "./components/Gallery";
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <NavBar />
          <Gallery />
        </div>
      </Provider>
    );
  }
}

export default App;
