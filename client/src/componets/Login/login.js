// @flow
import React, { Component } from "react";
import { Input, Button, Header, Modal, Icon } from "semantic-ui-react";
import "../Registration/register.css";

const ModalModalExample = (props) => (
  <Modal open={props.open} onClick={props.close}  >
    <Header icon='user x' content='Oh, no!' />
    <Modal.Content>
      <p>
        {props.message}
      </p>
    </Modal.Content>
  </Modal>
)


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorModal: false,
      open : false,
      message: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
  }
  open  = () => this.setState({open: true});

  close = () =>this.setState({open: false});

  // FISHY
  handleEmail = e => {
    let email = e.target.value;
    this.setState({ email: email });
  };
  handlePassword = e => {
    let password = e.target.value;
    this.setState({ password: password });
  };

  handleRedirect = (responseData: Object) => {
    if (responseData.status === "S") window.location = "/dashboard";
  };

  checkUserInput = () => {
    if (this.state.email === "" || this.state.password === "")
      alert("cant be blank"); // TO DO: MAKE THIS A MODAL
  };
  handleLogin = () => {
    this.checkUserInput();
    const userData = {
      username: this.state.email,
      password: this.state.password
    };
    console.log(userData);
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
      .then(text => {
        let response = JSON.parse(text)
        console.log(response.status)
        //TO DO : lowercase this
        if (response.status !== "Authenticated") {
          const  message = 'You may have enter either a wrong username or password, please try again.'
          this.setState({ errorModal: true, open: true, message: message });
          
        }
        //TO DO: check if user is firsTime ow dashboard
        window.location.href = '/firstTime'
      });
  };
  render() {
    // eslint-disable-next-line no-lone-blocks
    return (
      <div>
        {this.state.errorModal ? <ModalModalExample message={this.state.message} open={this.state.open}  close={this.close} /> : null}
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
