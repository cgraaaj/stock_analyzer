import React from "react";
import { Router, Route } from "react-router-dom";

import Home from "./Home";
import Header from "./Header";
import history from "../history";

// https://media.merriam-webster.com/audio/prons/en/us/mp3/f/fucker01.mp3,

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={Home}></Route>
        </div>
      </Router>
    </div>
  );
};

export default App;
