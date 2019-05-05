import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import "./register.css";
import { Redirect } from "react-router-dom";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isValidated: false,
      redirect: false,
      hiddenErrorMessage: true,
      firstTimeUser: false
    };
    this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    // this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleGoogleAuth = () => {
    fetch("/google", {
      credentials: "include",
      // mode: "cors",
      // credentials: "omit",
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

  handleSignUp = userData => {
    fetch("/auth/signUp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.text())
      .then(text => {
        console.log(JSON.parse(text));
        console.log("text.message === S", text.message === "S");
        if (true) {
          this.setState({ redirect: true, firstTimeUser: true });
        }
      });
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
    if (this.state.email === "" || this.state.password === "")
      console.log("cant be blank");
    console.log("pass", this.state.password);
    console.log("email", this.state.email);
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
      redirect = <Redirect to="/firstTime" />;
    return (
      <div>
        {redirect}s
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
