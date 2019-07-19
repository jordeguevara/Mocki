// @flow
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginContainer from "./containers/login";
import "semantic-ui-css/semantic.min.css";
import Interview from "./containers/interview";
import Dashboard from "./containers/dashboard";
import FirstTimeUser from "./containers/firstTime";
import Feedback from "./containers/feedback";
import "./App.css";
class App extends Component {
  render() {
    console.log("[App]", this.props);
    return (
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/firstTime" component={FirstTimeUser} />
            <Route path="/interview" component={Interview} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/firstTime" component={Feedback} />

          </Switch>
        </header>
        {/*  TO DO: DELETE THIS Afte confrming it all works above
              <Switch>
                <Route
                  path="/firstTime"
                 component = {FirstTimeUser}
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
                     store = {this.props.store} />) } />
                <Route path="/feedback" component={FeedBack} />
              </Switch>
            </header> */}
      </div>
    );
  }
}

export default App;
