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

let data = require('../questions.json');
console.log(data.Questions[0].answers[0]);

class FirstTimeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="questionContainer">
        <div className="question"> Q:{data.Questions[0].question} </div>
        <div className="questionNavigation">
          <button className="nextQuestionBtn"> Next Question</button>
        </div>
        <div>
          <span className="option">
            <button className="answer">A</button> {data.Questions[0].answers[0].a}
          </span>
          <span className="option">
            <button className="answer">B</button> {data.Questions[0].answers[0].b}
          </span>
          <span className="option">
            <button className="answer">C</button> {data.Questions[0].answers[0].c}
          </span>
          <span className="option">
            <button className="answer">D</button> {data.Questions[0].answers[0].d}
          </span>
        </div>
      </div>
    );
  }
}

export default FirstTimeUser;
