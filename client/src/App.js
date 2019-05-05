import React, { Component } from "react";
import LoginContainer from "./containers/login";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import Interview from "./containers/interview";
import "./App.css";
import Login from "./componets/Login/login";
import Dashboard from "./containers/dashboard";
import FirstTimeUser from "./containers/firstTime";
import FeedBack from "./containers/feedback";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route path="/firstTime" component={FirstTimeUser} />
              <Route path="/interview" component={Interview} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/login" component={LoginContainer} />
              <Route path="/feedback" component={FeedBack} />
            </Switch>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
