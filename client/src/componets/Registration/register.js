import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";

import "./register.css";
// import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
// import FirstTimeUser from "../../containers/firstTime";
// import history from '../../history'

interface User {
  username: string;
  password: string;
}
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      hiddenErrorMessage: true,
      firstTimeUser: true
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.checkUserInput = this.checkUserInput.bind(this);
    this.handleGithubAuth = this.handleGithubAuth.bind(this);
  }

  componentDidMount() {
    console.log("[Register Comp.]", this.props);
  }
  handleSignUp = (userData: User) => {
    return (
      fetch("/auth/signUp", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
        .then(response => response.text())
        // .then(text => {
        //   const res = JSON.parse(text);

        //   if (res.message === "Success") {
        //     alert(JSON.stringify(res,null,2))
        //     alert('Account success')
        //     //TO DO: how to reroute on async response
        //     // this.setState({
        //     //   redirect: true,
        //     //   firstTimeUser: true
        //     //   // user: res.user
        //     // });
        //     // this.props.handleAuth();
        //     // this.props.handleUserID(res.user);
        //   }
        //   return res.user;
        // })
        .catch(err => {
          console.error("Error occured during sign up process ", err);
        })
    );
  };
  checkUserInput = async () => {
    if (!this.state.email || !this.state.password) {
      alert("cant be blank");
      // TO DO create alert to warn user ie modal
    }
    let userData: User;
    if (validEmail(this.state.email)) {
      userData = {
        username: this.state.email,
        password: this.state.password
      };

      let user = await this.handleSignUp(userData);
      const res = JSON.parse(user);

      if (res.message === "Success") {
        alert(JSON.stringify(res, null, 2));
        alert("Account success");
      }
      console.log("[userId]", user);
      if (typeof user === "string") {
        user = JSON.parse(user);
        this.props.registerUser(user);
      }
    } else {
      this.setState({ hiddenErrorMessage: false });
    }

    // func: returns true if it is valid, o.w. false
    function validEmail(email) {
      const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regEx.test(String(email).toLowerCase());
    }
  };

  handleEmail = e => {
    const email = e.target.value;
    this.setState({ email });
  };

  handlePassword = e => {
    const password = e.target.value;
    this.setState({ password });
  };

  handleGithubAuth() {
    // fetch("/auth/github", {
    //   method: "GET",
    //   headers: {
    //     "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
    //     "Access-Control-Allow-Methods": "POST,GET",
    //     "Access-Control-Allow-Headers": "Content-Type, Authorization"
    //   }
    // });

  fetch("/auth/github", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
    })

  }
  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        <Input
          className="customInput"
          onChange={this.handleEmail}
          placeholder="Email"
        />
        <Input
          className="customInput"
          onChange={this.handlePassword}
          placeholder="Password"
          type="password"
        />
        <br />
        <Button
          size="big"
          className="customButton"
          onClick={this.checkUserInput}
        >
          Sign up
        </Button>
        <p>
          <span hidden={this.state.hiddenErrorMessage}>
            Invalid Email/Passoword
          </span>
        </p>

        <br />
        <Button size="big">
         <a href="http://localhost:3001/auth/github">  Github </a>
        </Button>
          <Button size="big">
         <a href="http://localhost:3001/auth/logout">  logout </a>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.registration.isLoggedIn
  };
};

const mapDisptachToProps = dispatch => ({
  registerUser: id => dispatch({ type: "SIGN_IN", id }) // return the dispatch function instead of directly calling it.
});

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Register);
