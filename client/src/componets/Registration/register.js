import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import "./register.css";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import FirstTimeUser from "../../containers/firstTime";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
      hiddenErrorMessage: true
    };
    this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.checkUserInput = this.checkUserInput.bind(this);
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
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  // TO DO: Implement Passport.js Local Strategy
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
        const res = JSON.parse(text);
        // let user = "";
        // console.log(JSON.parse(text));
        // console.log("text.message === S", res.message === "S");
        if (res.message === "S") {
          this.setState({
            redirect: true,
            firstTimeUser: true
            // user: res.user
          });
          // this.props.handleAuth();
          // this.props.handleUserID(res.user);
        }
      })
      .catch(err => {
        console.log("err during execution : ", err);
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({
          status: res.status,
          statusText: res.statusText
        });
      })
      .then(myJson => {
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({
          status: res.status,
          statusText: res.statusText
        });
      })
      .then(myJson => {
        console.log(JSON.stringify(myJson));
      })
      .catch(err => console.log("Error, with message:", err));
  };

  checkUserInput = () => {
    console.log("clicked");
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
    this.props.registerUser(1);
    // this.manualRegisterUser(userData);

    function validateEmail(email) {
      const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  render() {
    console.log("this.props", this.props);
    // let redirect = null;
    // if (this.state.redirect && this.state.firstTimeUser) {
    //   redirect = (
    //     <div>
    //       <Link to="/firstTime"> About</Link>
    //       <Route
    //         path="/firstTime"
    //         render={props => (
    //           <FirstTimeUser
    //       userId={this.state.userId}
    //       isAuthenticated={this.state.isAuthenticated}
    //     />
    //         )}
    //       />
    //     </div>
    //   );
    // }
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        {/* {redirect} */}
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
        {/* <div className="social">
          <Button
            size="big"
            circular
            onClick={this.handleGoogleAuth}
            color="red"
            icon="google"
          />

         <Button size="big" circular color="black" icon="github" />
          <Button size="big" circular color="linkedin" icon="linkedin" />
        </div> */}
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
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state
});

const mapDisptachToProps = dispatch => ({
  registerUser: id => {
    dispatch({ type: "SIGN_IN" });
  }
});

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Register);
