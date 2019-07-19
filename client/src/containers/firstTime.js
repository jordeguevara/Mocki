import React, { Component } from "react";
import {
  // BrowserRouter as Router,
  // Route,
  // Link,
  // Redirect,
  // Switch
} from "react-router-dom";
import { Header, Image, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./firstTime.css";
import userPhoto from "../assets/icon.png";
import {connect} from "react-redux"

let data = require("../questions.json");

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
          <p>Current level {props.level} </p>
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
    console.log('[firstTime]',this.props)
    this.state = {
      count: 0,
      quiz: [],
      showModal: false,
      score: 0
    };

    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleDashBoardRedirect = this.handleDashBoardRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.convertLettersToNumbers = this.convertLettersToNumbers.bind(this);
  }
  // Saves level to DB
  handleLevelService = () => {
    fetch("/updateLevel", {
      method: "PUT",
      body: JSON.stringify({ level: this.state.level })
    });
  };

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

    //TO DO add it to USER Model
    // and remove firstTime user
  };

  handleSubmit = () => {
    this.calculateScore();
    this.setState({ showModal: true });
  };
  handleDashBoardRedirect = () => {
    window.location = "/dashboard";
  };

  weigh = arr => {
    //if more questions add it manually
    // TO DO: Automate this
    arr[0] = 1.5 * arr[0]; // first question weights a lot
    arr[1] = 1.25 * arr[1];
    arr[2] = 1.15 * arr[2];
    arr[3] = 1.1 * arr[3]; // last question not of big importance
    return arr;
  };

  calculateScore = () => {
    let arr = [...this.state.quiz];

    for (let i = 0; i < arr.length; i++) {
      arr[i] = this.convertLettersToNumbers(arr[i]);
    }
    //weigh the updated arr
    arr = this.weigh(arr);
    const score = arr.reduce((acc, val) => (acc += val), 0); //calcuate score from arr
    let level = Math.floor(score / arr.length);
    this.setState({ quiz: arr, score: score, level: level });
  };

  convertLettersToNumbers = value => {
    switch (value) {
      case "A":
        value = 1;
        break;
      case "B":
        value = 2;
        break;
      case "C":
        value = 3;
        break;
      case "D":
        value = 4;
        break;
      default:
        value = 0;
    }

    return value;
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
          level={this.state.level}
          clickMethod={this.handleDashBoardRedirect}
          trigger={submitBtn}
          open={this.state.showModal}
        />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps,null)(FirstTimeUser);
