// @flow
import React, { Component } from "react";
import LoginContainer from "./containers/login";
import "semantic-ui-css/semantic.min.css";
import Interview from "./containers/interview";
import Dashboard from "./containers/dashboard";
import FirstTimeUser from "./containers/firstTime";
import Feedback from "./containers/feedback";

import { Provider } from "react-redux"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from "./store";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Provider store={store}>
              <Switch>
                <Route path="/login" component={LoginContainer} />
                <Route path="/firstTime" component={FirstTimeUser} />
                <Route path="/interview" component={Interview} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/firstTime" component={Feedback} />

              </Switch>
            </Provider>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
