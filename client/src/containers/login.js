// @flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Register from "../componets/Registration/register";
import Login from "../componets/Login/login";
import "./login.css";
import { withRouter,Redirect} from "react-router-dom";
import { Input, Button } from "semantic-ui-react";
// import Dashboard from "./dashboard";
import { connect } from "react-redux";
import store from "../store";
import { Provider } from "react-redux"

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    console.log("[Login Container", this.props);
    this.state = {
      registerOn: true,
      loginOn: false
    };
  }

  loginHandler = () => {
    this.setState({ registerOn: false, loginOn: true });
  };
  registerHandler = () => {
    this.setState({ registerOn: true, loginOn: false });
  };
  render() {
    if (this.props.loggedIn){
      return < Redirect to='firstTime' />
    }
    return (
      <div>
        <div className="ToggleContainer">
          <div className={"toggle"}>
            <Button.Group>
              <Button
                onClick={this.registerHandler}
                positive={this.state.registerOn}
              >
                SignUp
              </Button>
              <Button.Or />
              <Button onClick={this.loginHandler} positive={this.state.loginOn}>
                Login
              </Button>
            </Button.Group>
          </div>
        
          {this.state.registerOn ? <Register {...this.props} /> : <Login /> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.registration.isLoggedIn
  };
};


// const mapDisptachToProps = dispatch => {
//   registerUser: id => 
//     dispatch({ type: "SIGN_IN" })
  
// };

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(LoginContainer)
);
