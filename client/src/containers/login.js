import React, { Component } from "react";
import ReactDOM from "react-dom";
import Register from "../componets/Registration/register";
import Login from "../componets/Login/login";
import { Button } from "semantic-ui-react";
// import './App.css';

const cond = false;
class LoginContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isNew : this.props.isNew,
      registerOn: true,
      loginOn : false,
     } 
  }

  

   loginHandler = () =>{
      this.setState({isNew: false, registerOn: false, loginOn: true,})
      console.log(this.state);
    }
    registerHandler = ()=>{
      this.setState({isNew: true, registerOn: true, loginOn: false })
      console.log(this.state);
    }
  render() {
    return (
      <div>
        <Button.Group>
          <Button onClick={this.registerHandler}   positive={this.state.registerOn}  >SignUp</Button>
          <Button.Or />
          <Button onClick={this.loginHandler} postive={this.state.loginOn} >Login</Button>
        </Button.Group>
        {this.state.isNew === true ? <Register /> : <Login />}
        {/* <Login/>
          <Register/> */}
      </div>
    );
  }
}

ReactDOM.render(<LoginContainer />, document.getElementById("root"));

export default LoginContainer;
