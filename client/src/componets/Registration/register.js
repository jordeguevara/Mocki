import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isValidated: false
    };
  }

  registerUser = (data) => {
    fetch("/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
    const userData = {email: this.state.email,
                      password: this.state.password}
    this.registerUser(userData);
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
    return (
      <div>
        <Input onChange={this.handleEmail} placeholder="Email..." />
        <Input onChange={this.handlePassword} placeholder="Password..." />
        <Button circular color="facebook" icon="facebook" />
        <Button circular color="black" icon="github" />
        <Button circular color="linkedin" icon="linkedin" />
        <Button onClick={this.checkUserInput}>Sign up</Button>
      </div>
    );
  }
}
export default Register;
