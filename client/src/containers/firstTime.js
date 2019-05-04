import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   Switch
// } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./firstTime.css";

let data = require("../questions.json");
console.log(data.Questions[0].answers[0]);

class FirstTimeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      quiz: []
    };

    this.handleNextQuestion = this.handleNextQuestion.bind(this);
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
          {" "}
          Next Question
        </button>
      );
      form = (
        <div>
          {" "}
          <span className="option">
            <button onClick={this.handleButtonPressed} className="answer">
              A
            </button>{" "}
            {data.Questions[i].answers[0].a}
          </span>
          <span className="option">
            <button onClick={this.handleButtonPressed} className="answer">
              B
            </button>{" "}
            {data.Questions[i].answers[0].b}
          </span>
          <span className="option">
            <button onClick={this.handleButtonPressed} className="answer">
              C
            </button>{" "}
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
        submitBtn = <button>Submit</button>;
      }
    }
    return (
      <div className="questionContainer">
        {question}
        <div className="questionNavigation">{nextQuestionBtn}</div>
        {form}
        {submitBtn}
      </div>
    );
  }
}

export default FirstTimeUser;
