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
  constructor() {
    super();
    this.state = { isAuthenticated: false, userId: "" };
  }

  handleAuth = () => {
    this.setState({ isAuthenticated: true });
  };

  handleUserID = uuid => {
    this.setState({ userId: uuid });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route
                path="/firstTime"
                render={props => (
                  <FirstTimeUser
                    userId={this.state.userId}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                )}
              />
              <Route path="/interview" component={Interview} />
              <Route
                path="/dashboard"
                render={props => (
                  <Dashboard
                    userId={this.state.userId}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                )}
              />
              <Route
                path="/login"
                render={props => (
                  <LoginContainer
                    handleAuth={this.handleAuth}
                    handleUserID={this.handleUserID}
                    userId={this.state.userId}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                )}
              />
              <Route path="/feedback" component={FeedBack} />
            </Switch>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
