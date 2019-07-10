import React, { Component } from "react";
import ReactDOM from "react-dom";
import Register from "../componets/Registration/register";
import Login from "../componets/Login/login";
import { Button } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import "./login.css";
import Dashboard from "./dashboard";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    console.log("c props", props);
    this.state = {
      isNew: this.props.isNew,
      registerOn: true,
      loginOn: false,
      redirect: false // TO DO
    };

    //  this.renderRedirect = this.renderRedirect.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  // renderRedirect = () => {
  //   console.log('redirecting')
  //     return (<Switch><Redirect to={'/dashboard'} component={Dashboard}> </Redirect> </Switch>)
  //   }

  loginHandler = () => {
    this.setState({ isNew: false, registerOn: false, loginOn: true });
    console.log(this.state);
  };
  registerHandler = () => {
    this.setState({ isNew: true, registerOn: true, loginOn: false });
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <ToggleContainer
          isNew={this.state.isNew}
          registerHandler={this.registerHandler}
          loginHandler={this.loginHandler}
          // handleAuth={this.props.handleAuth}
          // handleUserID={this.props.handleUserID}
          // userId={this.props.userId}
          // isAuthenticated={this.props.isAuthenticated}

          // redirect={this.renderRedirect}
        />
      </div>
    );
  }
}

const ToggleContainer = props => {
  console.log("toggle", props);
  return (
    <div className="ToggleContainer">
      <div className={"toggle"}>
        <Button.Group>
          <Button onClick={props.registerHandler} positive={props.isNew}>
            SignUp
          </Button>
          <Button.Or />
          <Button onClick={props.loginHandler} positive={!props.isNew}>
            Login
          </Button>
        </Button.Group>
      </div>
      {props.isNew === true ? (
        <Register
          handleAuth={props.handleAuth}
          handleUserID={props.handleUserID}
          userId={props.userId}
          isAuthenticated={props.isAuthenticated}
        />
      ) : (
        <Login />
      )}
    </div>
  );
};

ReactDOM.render(<LoginContainer />, document.getElementById("root"));

export default LoginContainer;
