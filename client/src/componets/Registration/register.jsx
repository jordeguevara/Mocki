const Register = (props) => {
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
  </div>;
};

export default Register;
