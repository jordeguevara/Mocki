import React, { Component } from "react";
import "./questionPrompt.css";
import { Button } from "semantic-ui-react";
const questionData = {
  question: `A valid parentheses string is either empty (""), "(" + A + ")", or A +
  B, where A and B are valid parentheses strings, and + represents
  string concatenation. For example, "", "()", "(())()", and "(()(()))"
  are all valid parentheses strings. A valid parentheses string S is
  primitive if it is nonempty, and there does not exist a way to split
  it into S = A+B, with A and B nonempty valid parentheses strings.
  Given a valid parentheses string S, consider its primitive
  decomposition: S = P_1 + P_2 + ... + P_k, where P_i are primitive
  valid parentheses strings. Return S after removing the outermost
  parentheses of every primitive string in the primitive decomposition
  of S.`,
  example: {
    input: `Input: "(()())(())"`,
    output: `Output: "()()()"`,
    explanation: `Explanation: The input string is "(()())(())", with primitive
    decomposition "(()())" + "(())". After removing outer parentheses
    of each part, this is "()()" + "()" = "()()()".`
  }
};
class QuestionPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = { completed: false };
    this.handleEndInterviewSession = this.handleEndInterviewSession.bind(this);
  }

  handleEndInterviewSession() {
    // makes call to backend to close channel
    window.location = "/feedback";
    fetch("/survey", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: this.mapToJson(this.lobby)
    });
    this.setState({ completed: true });
  }
  render() {
    return (
      <div className={"QuestionPromptContainer"}>
        <div className={"questionTitle"}> Remove Outermost Parentheses </div>
        <p className={"questionBody"}>{questionData.question}</p>
        <p> Example </p>
        <div className={"exampleContainer"}>
          <blockquote>
            <p>{questionData.example.input}</p>
            <p>{questionData.example.output}</p>
            <p>{questionData.example.explanation}</p>
          </blockquote>
        </div>
        <Button onClick={this.handleEndInterviewSession} negative>
          End Session
        </Button>
      </div>
    );
  }
}
export default QuestionPrompt;
