import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./firstTime.css";
import userPhoto from "../assets/icon.png";

let data = require("../questions.json");
console.log(data.Questions[0].answers[0]);

let level = 1;
const ConfirmationModal = props => (
  <Modal trigger={props.trigger}>
    <Modal.Header>Confirmation</Modal.Header>
    <Modal.Content image>
      <Image wrapped size="medium" src={userPhoto} />
      <Modal.Description>
        <Header>Survey Completed!</Header>
        <div>
          <p>
            We got all the information needed to match you to others! Your
            current level is displayed below. Do not get discouraged if it is
            lower than expected but this will help you learn with other people
            at a similar experience level. Best of luck!
          </p>
          <p>Current level {level} </p>
          <button onClick={props.clickMethod} className={"submitBtn"}>
            Continue
          </button>
        </div>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

class FirstTimeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      quiz: [],
      showModal: false
    };

    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleDashBoardRedirect = this.handleDashBoardRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNextQuestion = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleButtonPressed = event => {
    let maxQuestion = data.Questions.length - 1;

    if (this.state.count > maxQuestion) {
      event.target.style = "display:hidden";
    }

    let arr = this.state.quiz;
    arr[this.state.count] = event.target.innerHTML;
    this.setState({ quiz: arr });

    console.log(this.state);
    console.log(data.Questions.length);

    //TO DO convert Letters to number, take average and add it to USER Model as Level then redirect to dashboard
    // and remove firstTime user
  };

  handleSubmit = () => {
    this.setState({ showModal: true });
  };
  handleDashBoardRedirect = () => {
    console.log("clicked redirect");
    window.location = "/dashboard";
  };

  render() {
    let i = this.state.count;
    let question;
    let form;
    let nextQuestionBtn;
    let submitBtn;
    if (i < data.Questions.length) {
      question = (
        <div className="question"> Q:{data.Questions[i].question} </div>
      );
      nextQuestionBtn = (
        <button onClick={this.handleNextQuestion} className="nextQuestionBtn">
          Next Question
        </button>
      );
      form = (
        <div>
          <span className="option">
            <button onClick={this.handleButtonPressed} className="answer">
              A
            </button>
            {data.Questions[i].answers[0].a}
          </span>
          <span className="option">
            <button onClick={this.handleButtonPressed} className="answer">
              B
            </button>
            {data.Questions[i].answers[0].b}
          </span>
          <span className="option">
            <button onClick={this.handleButtonPressed} className="answer">
              C
            </button>
            {data.Questions[i].answers[0].c}
          </span>
          <span onClick={this.handleButtonPressed} className="option">
            <button className="answer">D</button>{" "}
            {data.Questions[i].answers[0].d}
          </span>
        </div>
      );
      if (i === data.Questions.length - 1) {
        nextQuestionBtn = null;
        submitBtn = (
          <button onClick={this.handleSubmit} className={"submitBtn"}>
            Submit
          </button>
        );
      }
    }
    return (
      <div className="questionContainer">
        {question}
        <div className="questionNavigation">{nextQuestionBtn}</div>
        {form}
        <ConfirmationModal
          clickMethod={this.handleDashBoardRedirect}
          trigger={submitBtn}
          open={this.state.showModal}
        />
      </div>
    );
  }
}

export default FirstTimeUser;
