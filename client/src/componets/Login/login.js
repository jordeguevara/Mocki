import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import "../Registration/register.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isUserAuthenticated: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmail = e => {
    let email = e.target.value;
    this.setState({ email: email });
  };
  handlePassword = e => {
    let password = e.target.value;
    this.setState({ password: password });
  };

  handleRedirect = responseData => {
    console.log(responseData);
    if (responseData.status === "S") window.location = "/dashboard";
  };

  checkUserInput = () => {
    if (this.state.email === "" || this.state.password === "")
      console.log("cant be blank");
  };

  handleLogin = () => {
    this.checkUserInput();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    fetch("/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(reponse => {
        return reponse.text();
      })
      .then(text => this.handleRedirect(JSON.parse(text)));
  };
  render() {
    return (
      <div>
        <Input
          className={"customInput"}
          placeholder="Email"
          onChange={this.handleEmail}
        />
        <Input
          onChange={this.handlePassword}
          className={"customInput"}
          placeholder="Password"
          type="password"
        />
        <br />
        <Button onClick={this.handleLogin} className={"customButton"}>
          Login
        </Button>
      </div>
    );
  }
}
export default Login;
