import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import "./register.css";
import { Redirect, Switch, Route } from "react-router-dom";
import FirstTimeUser from "../../containers/firstTime";
import { stat } from "fs";
class Register extends Component {
  constructor(props) {
    super(props);
    console.log(" r props", props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
      hiddenErrorMessage: true,
      firstTimeUser: false
    };

    console.log("cdcdc", this.props);
    this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    // this.handleUserCred = this.handleUserCred.bind(this);
    // this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleGoogleAuth = () => {
    fetch("/google", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*"
      },
      redirect: "follow"
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // handleLocalAuth = (userData)=> {
  //   fetch('/auth/login',{
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(userData)
  //   })
  // }

  handleSignUp = async userData => {
    await fetch("/auth/signUp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.text())
      .then(text => {
        let res = JSON.parse(text);
        let user = "";
        console.log(JSON.parse(text));
        console.log("text.message === S", res.message === "S");
        if (res.message === "S") {
          this.setState({
            redirect: true,
            firstTimeUser: true,
            user: res.user
          });
          this.props.handleAuth();
          this.props.handleUserID(res.user);
        }
      });
    console.log(this.props);
  };

  manualRegisterUser = data => {
    fetch("/login/manual", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(res) {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject({
            status: res.status,
            statusText: res.statusText
          });
        }
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      })
      .catch(err => console.log("Error, with message:", err));
  };

  registerUser = data => {
    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(res) {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject({
            status: res.status,
            statusText: res.statusText
          });
        }
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      })
      .catch(err => console.log("Error, with message:", err));
  };

  componentDidMount() {}

  checkUserInput = () => {
    if (this.state.email === "" || this.state.password === "") {
      console.log("cant be blank");
      // TO DO create alert to warn user ie modal
    }
    if (validateEmail(this.state.email)) {
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      this.handleSignUp(userData);
    } else {
      this.setState({ hiddenErrorMessage: false });
    }
    // this.manualRegisterUser(userData);

    function validateEmail(email) {
      var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regEx.test(String(email).toLowerCase());
    }
  };
  handleEmail = e => {
    let email = e.target.value;
    this.setState({ email: email });
  };
  handlePassword = e => {
    let password = e.target.value;
    this.setState({ password: password });
  };

  render() {
    let redirect = null;
    if (this.state.redirect && this.state.firstTimeUser)
      redirect = (
        <Redirect to="/firstTime" />
        // <Route
        //   path="/firstTime"
        //   render={props => (
        //     <FirstTimeUser
        //       userId={this.state.userId}
        //       isAuthenticated={this.state.isAuthenticated}
        //     />
        //   )}
        // />
      );
    return (
      <div>
        {redirect}
        <Input
          className={"customInput"}
          onChange={this.handleEmail}
          placeholder="Email"
        />
        <Input
          className={"customInput"}
          onChange={this.handlePassword}
          placeholder="Password"
          type="password"
        />
        <div className={"social"}>
          <Button
            size={"big"}
            circular
            onClick={this.handleGoogleAuth}
            color="red"
            icon="google"
          />

          <Button size={"big"} circular color="black" icon="github" />
          <Button size={"big"} circular color="linkedin" icon="linkedin" />
        </div>
        <Button
          size={"big"}
          className={"customButton"}
          onClick={this.checkUserInput}
        >
          Sign up
        </Button>
        <p>
          <span hidden={this.state.hiddenErrorMessage}>
            {" "}
            Invalid Email/Passoword
          </span>{" "}
        </p>
      </div>
    );
  }
}

export default Register;
